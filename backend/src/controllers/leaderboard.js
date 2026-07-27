const Leaderboard = require('../models/leaderboard');
const User = require('../models/user');
const Problem = require('../models/problem');
const Submission = require('../models/submission');

const POINTS = { easy: 1, medium: 3, hard: 5 };

const calculateStreak = async (userId) => {
    const submissions = await Submission.find({ userId, status: 'accepted' })
        .select('createdAt')
        .sort({ createdAt: -1 })
        .lean();

    const activeDates = new Set();
    submissions.forEach(sub => {
        if (sub.createdAt) {
            activeDates.add(new Date(sub.createdAt).toISOString().split('T')[0]);
        }
    });

    const today = new Date();
    const todayString = today.toISOString().split('T')[0];
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayString = yesterday.toISOString().split('T')[0];

    if (!activeDates.has(todayString) && !activeDates.has(yesterdayString)) {
        return 0;
    }

    let streak = 1;
    let checkDate = new Date(activeDates.has(todayString) ? today : yesterday);
    while (true) {
        checkDate.setDate(checkDate.getDate() - 1);
        const checkDateString = checkDate.toISOString().split('T')[0];
        if (activeDates.has(checkDateString)) {
            streak++;
        } else {
            break;
        }
    }
    return streak;
};

const syncLeaderboard = async (userId) => {
    try {
        const user = await User.findById(userId).select('problemSolved').lean();
        if (!user) return;

        const solvedProblems = await Problem.find({ _id: { $in: user.problemSolved } })
            .select('difficulty')
            .lean();

        let easyCount = 0, mediumCount = 0, hardCount = 0;
        solvedProblems.forEach(p => {
            if (p.difficulty === 'easy') easyCount++;
            else if (p.difficulty === 'medium') mediumCount++;
            else if (p.difficulty === 'hard') hardCount++;
        });

        let points = easyCount * POINTS.easy + mediumCount * POINTS.medium + hardCount * POINTS.hard;
        const streak = await calculateStreak(userId);

        if (streak >= 7) {
            points = Math.round(points * 1.1);
        }

        await Leaderboard.findOneAndUpdate(
            { userId },
            {
                points,
                easyCount,
                mediumCount,
                hardCount,
                streak,
                lastUpdated: new Date()
            },
            { upsert: true, new: true }
        );
    } catch (err) {
        console.error('Leaderboard sync error:', err);
    }
};

const getGlobalLeaderboard = async (req, res) => {
    try {
        const leaderboard = await Leaderboard.find()
            .sort({ points: -1 })
            .limit(100)
            .populate('userId', 'firstName lastName emailId')
            .lean();

        res.status(200).json({ leaderboard });
    } catch (err) {
        res.status(500).send('Error fetching leaderboard: ' + err.message);
    }
};

const getWeeklyLeaderboard = async (req, res) => {
    try {
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);

        const recentAccepted = await Submission.find({
            status: 'accepted',
            createdAt: { $gte: weekAgo }
        }).select('userId problemId').lean();

        const userSolved = {};
        recentAccepted.forEach(sub => {
            const uid = sub.userId.toString();
            if (!userSolved[uid]) userSolved[uid] = new Set();
            userSolved[uid].add(sub.problemId.toString());
        });

        const results = [];
        for (const [userId, problemIds] of Object.entries(userSolved)) {
            const problems = await Problem.find({ _id: { $in: Array.from(problemIds) } })
                .select('difficulty').lean();
            let points = 0;
            problems.forEach(p => { points += POINTS[p.difficulty] || 0; });
            results.push({ userId, points, problemsSolved: problemIds.size });
        }

        results.sort((a, b) => b.points - a.points);
        const top100 = results.slice(0, 100);

        const populated = await Promise.all(
            top100.map(async (r) => {
                const user = await User.findById(r.userId)
                    .select('firstName lastName emailId')
                    .lean();
                return { ...r, user };
            })
        );

        res.status(200).json({ leaderboard: populated });
    } catch (err) {
        res.status(500).send('Error fetching weekly leaderboard: ' + err.message);
    }
};

const getMonthlyLeaderboard = async (req, res) => {
    try {
        const monthAgo = new Date();
        monthAgo.setDate(monthAgo.getDate() - 30);

        const recentAccepted = await Submission.find({
            status: 'accepted',
            createdAt: { $gte: monthAgo }
        }).select('userId problemId').lean();

        const userSolved = {};
        recentAccepted.forEach(sub => {
            const uid = sub.userId.toString();
            if (!userSolved[uid]) userSolved[uid] = new Set();
            userSolved[uid].add(sub.problemId.toString());
        });

        const results = [];
        for (const [userId, problemIds] of Object.entries(userSolved)) {
            const problems = await Problem.find({ _id: { $in: Array.from(problemIds) } })
                .select('difficulty').lean();
            let points = 0;
            problems.forEach(p => { points += POINTS[p.difficulty] || 0; });
            results.push({ userId, points, problemsSolved: problemIds.size });
        }

        results.sort((a, b) => b.points - a.points);
        const top100 = results.slice(0, 100);

        const populated = await Promise.all(
            top100.map(async (r) => {
                const user = await User.findById(r.userId)
                    .select('firstName lastName emailId')
                    .lean();
                return { ...r, user };
            })
        );

        res.status(200).json({ leaderboard: populated });
    } catch (err) {
        res.status(500).send('Error fetching monthly leaderboard: ' + err.message);
    }
};

const getTagLeaderboard = async (req, res) => {
    try {
        const { tag } = req.params;

        const tagProblems = await Problem.find({ tags: tag }).select('_id').lean();
        const problemIds = tagProblems.map(p => p._id);

        const accepted = await Submission.find({
            problemId: { $in: problemIds },
            status: 'accepted'
        }).select('userId problemId').lean();

        const userSolved = {};
        accepted.forEach(sub => {
            const uid = sub.userId.toString();
            if (!userSolved[uid]) userSolved[uid] = new Set();
            userSolved[uid].add(sub.problemId.toString());
        });

        const results = [];
        for (const [userId, solved] of Object.entries(userSolved)) {
            const problems = await Problem.find({ _id: { $in: Array.from(solved) } })
                .select('difficulty').lean();
            let points = 0;
            problems.forEach(p => { points += POINTS[p.difficulty] || 0; });
            results.push({ userId, points, problemsSolved: solved.size });
        }

        results.sort((a, b) => b.points - a.points);
        const top100 = results.slice(0, 100);

        const populated = await Promise.all(
            top100.map(async (r) => {
                const user = await User.findById(r.userId)
                    .select('firstName lastName emailId')
                    .lean();
                return { ...r, user };
            })
        );

        res.status(200).json({ leaderboard: populated });
    } catch (err) {
        res.status(500).send('Error fetching tag leaderboard: ' + err.message);
    }
};

const getUserRank = async (req, res) => {
    try {
        const { userId } = req.params;

        const userEntry = await Leaderboard.findOne({ userId }).lean();
        if (!userEntry) {
            return res.status(200).json({ rank: null, neighbors: [] });
        }

        const rank = await Leaderboard.countDocuments({ points: { $gt: userEntry.points } }) + 1;

        const neighbors = await Leaderboard.find()
            .sort({ points: -1 })
            .skip(Math.max(0, rank - 4))
            .limit(7)
            .populate('userId', 'firstName lastName emailId')
            .lean();

        res.status(200).json({ rank, neighbors });
    } catch (err) {
        res.status(500).send('Error fetching user rank: ' + err.message);
    }
};

module.exports = {
    syncLeaderboard,
    getGlobalLeaderboard,
    getWeeklyLeaderboard,
    getMonthlyLeaderboard,
    getTagLeaderboard,
    getUserRank
};
