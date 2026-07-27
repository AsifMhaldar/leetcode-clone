const User = require('../models/user');
const Submission = require('../models/submission');
const Problem = require('../models/problem');

const toggleFollow = async (req, res) => {
    try {
        const userId = req.result._id;
        const { targetId } = req.params;

        if (userId.toString() === targetId) {
            return res.status(400).send('You cannot follow yourself');
        }

        const targetUser = await User.findById(targetId);
        if (!targetUser) {
            return res.status(404).send('User not found');
        }

        const currentUser = await User.findById(userId);
        const isFollowing = currentUser.following.includes(targetId);

        if (isFollowing) {
            currentUser.following.pull(targetId);
            targetUser.followers.pull(userId);
        } else {
            currentUser.following.push(targetId);
            targetUser.followers.push(userId);
        }

        await currentUser.save();
        await targetUser.save();

        res.status(200).json({
            following: !isFollowing,
            followersCount: targetUser.followers.length,
            followingCount: currentUser.following.length
        });
    } catch (err) {
        res.status(500).send('Error toggling follow: ' + err.message);
    }
};

const getFollowers = async (req, res) => {
    try {
        const { userId } = req.params;
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 20;
        const skip = (page - 1) * limit;

        const user = await User.findById(userId)
            .select('followers')
            .populate('followers', 'firstName lastName emailId bio')
            .lean();

        if (!user) {
            return res.status(404).send('User not found');
        }

        const total = user.followers.length;
        const followers = user.followers.slice(skip, skip + limit);

        res.status(200).json({ followers, total, page, pages: Math.ceil(total / limit) });
    } catch (err) {
        res.status(500).send('Error fetching followers: ' + err.message);
    }
};

const getFollowing = async (req, res) => {
    try {
        const { userId } = req.params;
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 20;
        const skip = (page - 1) * limit;

        const user = await User.findById(userId)
            .select('following')
            .populate('following', 'firstName lastName emailId bio')
            .lean();

        if (!user) {
            return res.status(404).send('User not found');
        }

        const total = user.following.length;
        const following = user.following.slice(skip, skip + limit);

        res.status(200).json({ following, total, page, pages: Math.ceil(total / limit) });
    } catch (err) {
        res.status(500).send('Error fetching following: ' + err.message);
    }
};

const getFeed = async (req, res) => {
    try {
        const userId = req.result._id;
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 50;
        const skip = (page - 1) * limit;

        const currentUser = await User.findById(userId).select('following').lean();
        const followingIds = currentUser.following || [];

        const submissions = await Submission.find({
            userId: { $in: followingIds },
            status: 'accepted'
        })
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .populate('userId', 'firstName lastName emailId')
            .populate('problemId', 'title difficulty')
            .lean();

        res.status(200).json({ feed: submissions });
    } catch (err) {
        res.status(500).send('Error fetching feed: ' + err.message);
    }
};

const getPublicProfile = async (req, res) => {
    try {
        const { userId } = req.params;

        const user = await User.findById(userId)
            .select('firstName lastName emailId bio github linkedin website followers following problemSolved createdAt')
            .lean();

        if (!user) {
            return res.status(404).send('User not found');
        }

        const recentSubmissions = await Submission.find({ userId })
            .sort({ createdAt: -1 })
            .limit(10)
            .populate('problemId', 'title difficulty')
            .lean();

        const totalSubmissions = await Submission.countDocuments({ userId });

        const solvedProblems = await Problem.find({ _id: { $in: user.problemSolved } })
            .select('difficulty tags')
            .lean();

        const easyCount = solvedProblems.filter(p => p.difficulty === 'easy').length;
        const mediumCount = solvedProblems.filter(p => p.difficulty === 'medium').length;
        const hardCount = solvedProblems.filter(p => p.difficulty === 'hard').length;

        const submissions = await Submission.find({ userId }).select('language').lean();
        const langCount = {};
        submissions.forEach(s => {
            langCount[s.language] = (langCount[s.language] || 0) + 1;
        });
        const languages = Object.entries(langCount)
            .map(([name, count]) => ({ name, count }))
            .sort((a, b) => b.count - a.count)
            .slice(0, 5);

        res.status(200).json({
            user,
            recentSubmissions,
            totalSubmissions,
            easyCount,
            mediumCount,
            hardCount,
            languages
        });
    } catch (err) {
        res.status(500).send('Error fetching public profile: ' + err.message);
    }
};

module.exports = {
    toggleFollow,
    getFollowers,
    getFollowing,
    getFeed,
    getPublicProfile
};
