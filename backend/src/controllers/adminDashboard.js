const Problem = require('../models/problem');
const User = require('../models/user');
const Submission = require('../models/submission');
const mongoose = require('mongoose');

const getDashboardStats = async (req, res) => {
    try {
        const now = new Date();

        const thisMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);
        const lastMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);
        const lastMonthEnd = new Date(now.getFullYear(), now.getMonth(), 0, 23, 59, 59);

        const sevenDaysAgo = new Date(now);
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6);
        sevenDaysAgo.setHours(0, 0, 0, 0);

        const thirtyDaysAgo = new Date(now);
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 29);
        thirtyDaysAgo.setHours(0, 0, 0, 0);

        const thisMonthObjectId = mongoose.Types.ObjectId.createFromTime(
            Math.floor(thisMonthStart.getTime() / 1000)
        );
        const lastMonthObjectId = mongoose.Types.ObjectId.createFromTime(
            Math.floor(lastMonthStart.getTime() / 1000)
        );

        const oneDayAgo = new Date(now);
        oneDayAgo.setDate(oneDayAgo.getDate() - 1);

        const [
            totalProblems,
            totalUsers,
            totalSubmissions,
            acceptedSubmissions,
            problemsThisMonth,
            problemsLastMonth,
            usersThisMonth,
            usersLastMonth,
            submissionsThisMonth,
            submissionsLastMonth,
            recentSubmissions,
            difficultyDistribution,
            submissionTrends,
            userGrowth,
            dailySubmissions,
            weeklySubmissions,
            monthlySubmissions,
            activeUserCount,
            languageDistribution,
            peakHoursData,
        ] = await Promise.all([
            Problem.countDocuments(),
            User.countDocuments(),
            Submission.countDocuments(),
            Submission.countDocuments({ status: 'accepted' }),

            Problem.countDocuments({ _id: { $gte: thisMonthObjectId } }),
            Problem.countDocuments({ _id: { $gte: lastMonthObjectId, $lt: thisMonthObjectId } }),

            User.countDocuments({ createdAt: { $gte: thisMonthStart } }),
            User.countDocuments({ createdAt: { $gte: lastMonthStart, $lte: lastMonthEnd } }),

            Submission.countDocuments({ createdAt: { $gte: thisMonthStart } }),
            Submission.countDocuments({ createdAt: { $gte: lastMonthStart, $lte: lastMonthEnd } }),

            Submission.find({})
                .sort({ createdAt: -1 })
                .limit(10)
                .populate('userId', 'firstName lastName')
                .populate('problemId', 'title')
                .lean(),

            Problem.aggregate([
                { $group: { _id: '$difficulty', count: { $sum: 1 } } }
            ]),

            Submission.aggregate([
                { $match: { createdAt: { $gte: sevenDaysAgo } } },
                {
                    $group: {
                        _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
                        count: { $sum: 1 }
                    }
                },
                { $sort: { _id: 1 } }
            ]),

            User.aggregate([
                { $match: { createdAt: { $gte: thirtyDaysAgo } } },
                {
                    $group: {
                        _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
                        count: { $sum: 1 }
                    }
                },
                { $sort: { _id: 1 } }
            ]),

            Submission.countDocuments({ createdAt: { $gte: oneDayAgo } }),
            Submission.countDocuments({ createdAt: { $gte: sevenDaysAgo } }),
            Submission.countDocuments({ createdAt: { $gte: thirtyDaysAgo } }),

            Submission.distinct('userId', { createdAt: { $gte: thirtyDaysAgo } }).then(ids => ids.length),

            Submission.aggregate([
                { $match: { createdAt: { $gte: thirtyDaysAgo }, lang: { $exists: true, $ne: '' } } },
                { $group: { _id: '$lang', count: { $sum: 1 } } },
                { $sort: { count: -1 } }
            ]),

            Submission.aggregate([
                { $match: { createdAt: { $gte: sevenDaysAgo } } },
                { $group: { _id: { $hour: '$createdAt' }, count: { $sum: 1 } } },
                { $sort: { count: -1 } },
                { $limit: 1 }
            ]),
        ]);

        const computePercentChange = (current, previous) => {
            if (previous === 0) return current > 0 ? 100 : 0;
            return Math.round(((current - previous) / previous) * 100);
        };

        const successRate = totalSubmissions > 0
            ? Math.round((acceptedSubmissions / totalSubmissions) * 100)
            : 0;

        const recentActivity = recentSubmissions.map((sub) => ({
            _id: sub._id,
            userName: sub.userId
                ? `${sub.userId.firstName} ${sub.userId.lastName || ''}`.trim()
                : 'Unknown',
            problemTitle: sub.problemId ? sub.problemId.title : 'Deleted Problem',
            status: sub.status,
            createdAt: sub.createdAt,
        }));

        const difficultyMap = { easy: 0, medium: 0, hard: 0 };
        difficultyDistribution.forEach((d) => {
            difficultyMap[d._id] = d.count;
        });
        const difficultyData = [
            { name: 'Easy', value: difficultyMap.easy, color: '#22c55e' },
            { name: 'Medium', value: difficultyMap.medium, color: '#facc15' },
            { name: 'Hard', value: difficultyMap.hard, color: '#ef4444' },
        ];

        const submissionTrendsMap = {};
        submissionTrends.forEach((t) => {
            submissionTrendsMap[t._id] = t.count;
        });
        const submissionTrendsData = [];
        for (let i = 6; i >= 0; i--) {
            const date = new Date(now);
            date.setDate(date.getDate() - i);
            const key = date.toISOString().split('T')[0];
            submissionTrendsData.push({
                date: key,
                label: date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }),
                count: submissionTrendsMap[key] || 0,
            });
        }

        const userGrowthMap = {};
        userGrowth.forEach((u) => {
            userGrowthMap[u._id] = u.count;
        });
        const userGrowthData = [];
        for (let i = 29; i >= 0; i--) {
            const date = new Date(now);
            date.setDate(date.getDate() - i);
            const key = date.toISOString().split('T')[0];
            userGrowthData.push({
                date: key,
                label: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
                count: userGrowthMap[key] || 0,
            });
        }

        const topLanguage = languageDistribution.length > 0 ? languageDistribution[0]._id : 'N/A';
        const peakHours = peakHoursData.length > 0 ? `${peakHoursData[0]._id}:00` : 'N/A';

        res.status(200).send({
            stats: {
                totalProblems,
                totalUsers,
                totalSubmissions,
                successRate,
                problemsChange: computePercentChange(problemsThisMonth, problemsLastMonth),
                usersChange: computePercentChange(usersThisMonth, usersLastMonth),
                submissionsChange: computePercentChange(submissionsThisMonth, submissionsLastMonth),
                activeUsers: activeUserCount,
                dailySubmissions,
                weeklySubmissions,
                monthlySubmissions,
                topLanguage,
                peakHours,
            },
            recentActivity,
            difficultyDistribution: difficultyData,
            submissionTrends: submissionTrendsData,
            userGrowth: userGrowthData,
            languageDistribution: languageDistribution.map(l => ({
                name: l._id,
                value: l.count,
                percentage: totalSubmissions > 0 ? Math.round((l.count / totalSubmissions) * 100) : 0,
            })),
        });

    } catch (err) {
        console.error('Dashboard stats error:', err);
        res.status(500).send('Error fetching dashboard stats: ' + err.message);
    }
};

// ── GET /admin/users — List users with search, filter, sort, pagination ──
const getUsers = async (req, res) => {
    try {
        const {
            search = '',
            role = 'all',
            sort = 'createdAt',
            order = 'desc',
            page = 1,
            limit = 10,
        } = req.query;

        const pageNum = Math.max(1, parseInt(page));
        const limitNum = Math.min(50, Math.max(1, parseInt(limit)));
        const skip = (pageNum - 1) * limitNum;

        const matchStage = {};
        if (role !== 'all') {
            matchStage.role = role;
        }

        const searchRegex = search ? new RegExp(search, 'i') : null;
        if (searchRegex) {
            matchStage.$or = [
                { firstName: searchRegex },
                { lastName: searchRegex },
                { emailId: searchRegex },
            ];
        }

        const sortField = ['createdAt', 'updatedAt', 'firstName', 'emailId', 'role'].includes(sort) ? sort : 'createdAt';
        const sortOrder = order === 'asc' ? 1 : -1;

        const [users, totalCount] = await Promise.all([
            User.find(matchStage)
                .select('-password')
                .sort({ [sortField]: sortOrder })
                .skip(skip)
                .limit(limitNum)
                .lean(),
            User.countDocuments(matchStage),
        ]);

        const userIds = users.map(u => u._id);
        const submissions = await Submission.find({ userId: { $in: userIds } })
            .select('userId status createdAt')
            .lean();

        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

        const userStatsMap = {};
        submissions.forEach(sub => {
            const uid = sub.userId.toString();
            if (!userStatsMap[uid]) {
                userStatsMap[uid] = { totalSubmissions: 0, acceptedSubmissions: 0, lastActive: null };
            }
            userStatsMap[uid].totalSubmissions++;
            if (sub.status === 'accepted') userStatsMap[uid].acceptedSubmissions++;
            if (!userStatsMap[uid].lastActive || sub.createdAt > userStatsMap[uid].lastActive) {
                userStatsMap[uid].lastActive = sub.createdAt;
            }
        });

        const enrichedUsers = users.map(user => {
            const uid = user._id.toString();
            const stats = userStatsMap[uid] || { totalSubmissions: 0, acceptedSubmissions: 0, lastActive: null };
            const acceptanceRate = stats.totalSubmissions > 0
                ? Math.round((stats.acceptedSubmissions / stats.totalSubmissions) * 100)
                : 0;
            const isActive = stats.lastActive && stats.lastActive >= thirtyDaysAgo;
            return {
                ...user,
                problemsSolvedCount: user.problemSolved ? user.problemSolved.length : 0,
                totalSubmissions: stats.totalSubmissions,
                acceptedSubmissions: stats.acceptedSubmissions,
                acceptanceRate,
                lastActive: stats.lastActive,
                isActive,
            };
        });

        const totalPages = Math.ceil(totalCount / limitNum);

        let stats;
        if (pageNum === 1 && !search && role === 'all') {
            const allUsers = await User.find().select('role problemSolved').lean();
            const allUserIds = allUsers.map(u => u._id);
            const allSubmissions = await Submission.find({ userId: { $in: allUserIds } })
                .select('userId status')
                .lean();

            const thirtyDays = new Date();
            thirtyDays.setDate(thirtyDays.getDate() - 30);

            let activeCount = 0;
            const allUserStatsMap = {};
            allSubmissions.forEach(sub => {
                const uid = sub.userId.toString();
                if (!allUserStatsMap[uid]) allUserStatsMap[uid] = { lastActive: null };
                if (!allUserStatsMap[uid].lastActive || sub.createdAt > allUserStatsMap[uid].lastActive) {
                    allUserStatsMap[uid].lastActive = sub.createdAt;
                }
            });

            Object.values(allUserStatsMap).forEach(s => {
                if (s.lastActive && s.lastActive >= thirtyDays) activeCount++;
            });

            let totalSolutions = 0;
            allUsers.forEach(u => {
                totalSolutions += (u.problemSolved ? u.problemSolved.length : 0);
            });

            stats = {
                totalUsers: allUsers.length,
                administrators: allUsers.filter(u => u.role === 'admin').length,
                activeUsers: activeCount,
                totalSolutions,
            };
        }

        res.status(200).json({
            users: enrichedUsers,
            pagination: {
                currentPage: pageNum,
                totalPages,
                totalCount,
                limit: limitNum,
            },
            ...(stats ? { stats } : {}),
        });
    } catch (err) {
        console.error('Get users error:', err);
        res.status(500).json({ error: 'Error fetching users: ' + err.message });
    }
};

// ── PUT /admin/users/:userId/role — Update user role ──
const updateUserRole = async (req, res) => {
    try {
        const { userId } = req.params;
        const { role } = req.body;

        if (!['user', 'admin'].includes(role)) {
            return res.status(400).json({ error: 'Invalid role. Must be "user" or "admin".' });
        }

        const user = await User.findById(userId).select('-password').lean();
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        if (user._id.toString() === req.result._id.toString()) {
            return res.status(400).json({ error: 'Cannot change your own role' });
        }

        const updated = await User.findByIdAndUpdate(
            userId,
            { role },
            { new: true }
        ).select('-password').lean();

        res.status(200).json({ user: updated, message: `Role updated to ${role}` });
    } catch (err) {
        console.error('Update role error:', err);
        res.status(500).json({ error: 'Error updating role: ' + err.message });
    }
};

// ── DELETE /admin/users/:userId — Delete a user ──
const deleteUser = async (req, res) => {
    try {
        const { userId } = req.params;

        if (userId === req.result._id.toString()) {
            return res.status(400).json({ error: 'Cannot delete your own account' });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        await Promise.all([
            User.findByIdAndDelete(userId),
            Submission.deleteMany({ userId }),
        ]);

        res.status(200).json({ message: 'User deleted successfully' });
    } catch (err) {
        console.error('Delete user error:', err);
        res.status(500).json({ error: 'Error deleting user: ' + err.message });
    }
};

module.exports = { getDashboardStats, getUsers, updateUserRole, deleteUser };
