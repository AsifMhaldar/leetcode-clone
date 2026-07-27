const Activity = require('../models/activity');
const User = require('../models/user');
const Submission = require('../models/submission');
const Problem = require('../models/problem');
const Leaderboard = require('../models/leaderboard');

const normalizeTags = (tags) => {
    if (Array.isArray(tags)) return tags;
    if (typeof tags === 'string' && tags) return [tags];
    return [];
};

const getEnhancedFeed = async (req, res) => {
    try {
        const userId = req.result._id;
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 20;
        const skip = (page - 1) * limit;
        const filter = req.query.filter || 'all';

        const currentUser = await User.findById(userId).select('following').lean();
        const followingIds = currentUser.following || [];

        let query = { userId: { $in: followingIds } };

        if (filter === 'solved') query.type = 'solved';
        else if (filter === 'streak') query.type = 'streak';
        else if (filter === 'badge') query.type = 'badge';
        else if (filter === 'discussed') query.type = 'discussed';

        const activities = await Activity.find(query)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .populate('userId', 'firstName lastName emailId')
            .populate('problemId', 'title difficulty tags')
            .lean();

        activities.forEach(a => {
            if (a.problemId?.tags != null) {
                a.problemId.tags = normalizeTags(a.problemId.tags);
            }
        });

        const total = await Activity.countDocuments(query);

        res.status(200).json({
            activities,
            total,
            page,
            pages: Math.ceil(total / limit),
            hasMore: skip + activities.length < total
        });
    } catch (err) {
        res.status(500).send('Error fetching feed: ' + err.message);
    }
};

const createActivity = async (req, res) => {
    try {
        const userId = req.result._id;
        const { type, problemId, content, codeSnippet } = req.body;

        if (!type) {
            return res.status(400).send('Activity type is required');
        }

        const activity = await Activity.create({
            userId,
            type,
            problemId: problemId || undefined,
            content: content || '',
            codeSnippet: codeSnippet || ''
        });

        const populated = await activity.populate('userId', 'firstName lastName emailId');
        res.status(201).json({ activity: populated });
    } catch (err) {
        res.status(500).send('Error creating activity: ' + err.message);
    }
};

const toggleLike = async (req, res) => {
    try {
        const { activityId } = req.params;
        const userId = req.result._id;

        const activity = await Activity.findById(activityId);
        if (!activity) {
            return res.status(404).send('Activity not found');
        }

        const index = activity.likes.indexOf(userId);
        if (index > -1) {
            activity.likes.splice(index, 1);
        } else {
            activity.likes.push(userId);
        }

        await activity.save();

        res.status(200).json({
            liked: index === -1,
            likeCount: activity.likes.length
        });
    } catch (err) {
        res.status(500).send('Error toggling like: ' + err.message);
    }
};

const addComment = async (req, res) => {
    try {
        const { activityId } = req.params;
        const { content } = req.body;
        const userId = req.result._id;

        if (!content) {
            return res.status(400).send('Comment content is required');
        }

        const activity = await Activity.findById(activityId);
        if (!activity) {
            return res.status(404).send('Activity not found');
        }

        activity.comments.push({ userId, content });
        await activity.save();

        const populated = await activity.populate('comments.userId', 'firstName lastName emailId');
        res.status(201).json({ comments: populated.comments });
    } catch (err) {
        res.status(500).send('Error adding comment: ' + err.message);
    }
};

const toggleSave = async (req, res) => {
    try {
        const { activityId } = req.params;
        const userId = req.result._id;

        const activity = await Activity.findById(activityId);
        if (!activity) {
            return res.status(404).send('Activity not found');
        }

        const index = activity.saves.indexOf(userId);
        if (index > -1) {
            activity.saves.splice(index, 1);
        } else {
            activity.saves.push(userId);
        }

        await activity.save();

        res.status(200).json({
            saved: index === -1,
            saveCount: activity.saves.length
        });
    } catch (err) {
        res.status(500).send('Error toggling save: ' + err.message);
    }
};

const incrementShare = async (req, res) => {
    try {
        const { activityId } = req.params;

        const activity = await Activity.findByIdAndUpdate(
            activityId,
            { $inc: { shares: 1 } },
            { new: true }
        );

        if (!activity) {
            return res.status(404).send('Activity not found');
        }

        res.status(200).json({ shares: activity.shares });
    } catch (err) {
        res.status(500).send('Error sharing: ' + err.message);
    }
};

const getSuggestedUsers = async (req, res) => {
    try {
        const userId = req.result._id;
        const currentUser = await User.findById(userId).select('following').lean();
        const followingIds = currentUser.following || [];
        const excludeIds = [...followingIds, userId];

        const users = await User.find({ _id: { $nin: excludeIds } })
            .select('firstName lastName emailId problemSolved')
            .limit(10)
            .lean();

        const enriched = users.map(u => ({
            ...u,
            solvedCount: u.problemSolved?.length || 0
        })).sort((a, b) => b.solvedCount - a.solvedCount);

        res.status(200).json({ users: enriched });
    } catch (err) {
        res.status(500).send('Error fetching suggestions: ' + err.message);
    }
};

const getTrendingProblems = async (req, res) => {
    try {
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);

        const recentSubmissions = await Submission.find({
            status: 'accepted',
            createdAt: { $gte: weekAgo }
        }).select('problemId').lean();

        const problemCounts = {};
        recentSubmissions.forEach(s => {
            const pid = s.problemId.toString();
            problemCounts[pid] = (problemCounts[pid] || 0) + 1;
        });

        const sorted = Object.entries(problemCounts)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 10);

        const problems = await Promise.all(
            sorted.map(async ([problemId, solves]) => {
                const problem = await Problem.findById(problemId)
                    .select('title difficulty tags')
                    .lean();
                if (problem) {
                    problem.tags = normalizeTags(problem.tags);
                }
                return problem ? { ...problem, solves } : null;
            })
        );

        res.status(200).json({ problems: problems.filter(Boolean) });
    } catch (err) {
        res.status(500).send('Error fetching trending: ' + err.message);
    }
};

const getDailyChallenge = async (req, res) => {
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const totalProblems = await Problem.countDocuments();
        if (totalProblems === 0) {
            return res.status(200).json({ problem: null });
        }

        const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / 86400000);
        const problemIndex = dayOfYear % totalProblems;

        const problem = await Problem.findOne()
            .skip(problemIndex)
            .select('title difficulty tags description')
            .lean();

        if (problem) {
            problem.tags = normalizeTags(problem.tags);
        }

        res.status(200).json({ problem });
    } catch (err) {
        res.status(500).send('Error fetching daily challenge: ' + err.message);
    }
};

const getActiveFriends = async (req, res) => {
    try {
        const userId = req.result._id;
        const currentUser = await User.findById(userId).select('following').lean();
        const followingIds = currentUser.following || [];

        const recentDate = new Date();
        recentDate.setDate(recentDate.getDate() - 7);

        const activeUserIds = await Submission.distinct('userId', {
            userId: { $in: followingIds },
            createdAt: { $gte: recentDate }
        });

        const users = await User.find({ _id: { $in: activeUserIds } })
            .select('firstName lastName emailId')
            .limit(10)
            .lean();

        res.status(200).json({ users });
    } catch (err) {
        res.status(500).send('Error fetching active friends: ' + err.message);
    }
};

const getLeaderboardPreview = async (req, res) => {
    try {
        const top5 = await Leaderboard.find()
            .sort({ points: -1 })
            .limit(5)
            .populate('userId', 'firstName lastName emailId')
            .lean();

        res.status(200).json({ leaderboard: top5 });
    } catch (err) {
        res.status(500).send('Error fetching leaderboard preview: ' + err.message);
    }
};

const autoGenerateActivity = async (userId, type, problemId) => {
    try {
        await Activity.create({ userId, type, problemId });
    } catch (err) {
        console.error('Auto-generate activity error:', err);
    }
};

module.exports = {
    getEnhancedFeed,
    createActivity,
    toggleLike,
    addComment,
    toggleSave,
    incrementShare,
    getSuggestedUsers,
    getTrendingProblems,
    getDailyChallenge,
    getActiveFriends,
    getLeaderboardPreview,
    autoGenerateActivity
};
