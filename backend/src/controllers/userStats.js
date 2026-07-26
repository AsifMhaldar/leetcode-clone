const User = require('../models/user');
const Problem = require('../models/problem');
const Submission = require('../models/submission');
const mongoose = require('mongoose');

const getStatsOverview = async (req, res) => {
    try {
        const userId = req.result._id;

        const user = await User.findById(userId)
            .select('problemSolved createdAt')
            .lean();

        if (!user) {
            return res.status(404).send('User not found');
        }

        const totalSolved = user.problemSolved.length;
        const totalProblems = await Problem.countDocuments();

        const solvedProblems = await Problem.find({ _id: { $in: user.problemSolved } })
            .select('difficulty')
            .lean();

        const easySolved = solvedProblems.filter(p => p.difficulty === 'easy').length;
        const mediumSolved = solvedProblems.filter(p => p.difficulty === 'medium').length;
        const hardSolved = solvedProblems.filter(p => p.difficulty === 'hard').length;

        const submissions = await Submission.find({ userId })
            .select('status createdAt')
            .lean();

        const totalSubmissions = submissions.length;
        const acceptedSubmissions = submissions.filter(s => s.status === 'accepted').length;
        const acceptanceRate = totalSubmissions > 0
            ? Math.round((acceptedSubmissions / totalSubmissions) * 100)
            : 0;

        const rank = await User.countDocuments({
            $expr: { $gt: [{ $size: '$problemSolved' }, totalSolved] }
        }) + 1;
        const totalUsers = await User.countDocuments();

        const activeDates = new Set();
        submissions.forEach(sub => {
            if (sub.createdAt) {
                activeDates.add(new Date(sub.createdAt).toISOString().split('T')[0]);
            }
        });

        let currentStreak = 0;
        let longestStreak = 0;
        let tempStreak = 0;
        const activeDatesArray = Array.from(activeDates).sort();

        const today = new Date();
        const todayString = today.toISOString().split('T')[0];
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayString = yesterday.toISOString().split('T')[0];

        if (activeDates.has(todayString) || activeDates.has(yesterdayString)) {
            let checkDate = new Date(yesterday);
            currentStreak = 1;
            while (true) {
                checkDate.setDate(checkDate.getDate() - 1);
                const checkDateString = checkDate.toISOString().split('T')[0];
                if (activeDates.has(checkDateString)) {
                    currentStreak++;
                } else {
                    break;
                }
            }
        }

        if (activeDatesArray.length > 0) {
            tempStreak = 1;
            longestStreak = 1;
            for (let i = 1; i < activeDatesArray.length; i++) {
                const prevDate = new Date(activeDatesArray[i - 1]);
                const currDate = new Date(activeDatesArray[i]);
                const diffDays = (currDate - prevDate) / (1000 * 60 * 60 * 24);
                if (diffDays === 1) {
                    tempStreak++;
                    longestStreak = Math.max(longestStreak, tempStreak);
                } else {
                    tempStreak = 1;
                }
            }
        }

        const daysSinceJoin = Math.max(1, Math.ceil((today - new Date(user.createdAt)) / (1000 * 60 * 60 * 24)));

        res.status(200).send({
            totalSolved,
            totalProblems,
            easySolved,
            mediumSolved,
            hardSolved,
            totalSubmissions,
            acceptanceRate,
            rank,
            totalUsers,
            currentStreak,
            longestStreak,
            daysSinceJoin,
        });
    } catch (err) {
        console.error('Stats overview error:', err);
        res.status(500).send('Error fetching stats overview: ' + err.message);
    }
};

const getStatsDifficulty = async (req, res) => {
    try {
        const userId = req.result._id;

        const user = await User.findById(userId)
            .select('problemSolved')
            .lean();

        const solvedProblems = await Problem.find({ _id: { $in: user.problemSolved } })
            .select('difficulty')
            .lean();

        const totalEasy = await Problem.countDocuments({ difficulty: 'easy' });
        const totalMedium = await Problem.countDocuments({ difficulty: 'medium' });
        const totalHard = await Problem.countDocuments({ difficulty: 'hard' });

        const easySolved = solvedProblems.filter(p => p.difficulty === 'easy').length;
        const mediumSolved = solvedProblems.filter(p => p.difficulty === 'medium').length;
        const hardSolved = solvedProblems.filter(p => p.difficulty === 'hard').length;

        res.status(200).send({
            distribution: [
                { name: 'Easy', solved: easySolved, total: totalEasy, color: '#22c55e' },
                { name: 'Medium', solved: mediumSolved, total: totalMedium, color: '#facc15' },
                { name: 'Hard', solved: hardSolved, total: totalHard, color: '#ef4444' },
            ],
        });
    } catch (err) {
        console.error('Stats difficulty error:', err);
        res.status(500).send('Error fetching difficulty stats: ' + err.message);
    }
};

const getStatsTags = async (req, res) => {
    try {
        const userId = req.result._id;

        const user = await User.findById(userId)
            .select('problemSolved')
            .lean();

        const solvedProblems = await Problem.find({ _id: { $in: user.problemSolved } })
            .select('tags')
            .lean();

        const allProblems = await Problem.find()
            .select('tags')
            .lean();

        const tagSolved = {};
        const tagTotal = {};

        allProblems.forEach(p => {
            if (p.tags) {
                tagTotal[p.tags] = (tagTotal[p.tags] || 0) + 1;
            }
        });

        solvedProblems.forEach(p => {
            if (p.tags) {
                tagSolved[p.tags] = (tagSolved[p.tags] || 0) + 1;
            }
        });

        const tags = Object.keys(tagTotal).map(tag => ({
            tag,
            solved: tagSolved[tag] || 0,
            total: tagTotal[tag],
            percentage: tagTotal[tag] > 0
                ? Math.round(((tagSolved[tag] || 0) / tagTotal[tag]) * 100)
                : 0,
        })).sort((a, b) => b.percentage - a.percentage);

        res.status(200).send({ tags });
    } catch (err) {
        console.error('Stats tags error:', err);
        res.status(500).send('Error fetching tag stats: ' + err.message);
    }
};

const getStatsTimeline = async (req, res) => {
    try {
        const userId = req.result._id;
        const { days = 30 } = req.query;
        const numDays = Math.min(parseInt(days) || 30, 365);

        const startDate = new Date();
        startDate.setDate(startDate.getDate() - (numDays - 1));
        startDate.setHours(0, 0, 0, 0);

        const submissions = await Submission.find({
            userId,
            createdAt: { $gte: startDate },
        })
            .select('createdAt status')
            .lean();

        const dayMap = {};
        submissions.forEach(sub => {
            if (sub.createdAt) {
                const key = new Date(sub.createdAt).toISOString().split('T')[0];
                if (!dayMap[key]) {
                    dayMap[key] = { total: 0, accepted: 0 };
                }
                dayMap[key].total += 1;
                if (sub.status === 'accepted') {
                    dayMap[key].accepted += 1;
                }
            }
        });

        const timeline = [];
        for (let i = numDays - 1; i >= 0; i--) {
            const date = new Date();
            date.setDate(date.getDate() - i);
            const key = date.toISOString().split('T')[0];
            timeline.push({
                date: key,
                label: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
                total: dayMap[key]?.total || 0,
                accepted: dayMap[key]?.accepted || 0,
            });
        }

        res.status(200).send({ timeline, numDays });
    } catch (err) {
        console.error('Stats timeline error:', err);
        res.status(500).send('Error fetching timeline stats: ' + err.message);
    }
};

const getStatsHeatmap = async (req, res) => {
    try {
        const userId = req.result._id;

        const submissions = await Submission.find({ userId })
            .select('createdAt')
            .lean();

        const dayCounts = {};
        submissions.forEach(sub => {
            if (sub.createdAt) {
                const key = new Date(sub.createdAt).toISOString().split('T')[0];
                dayCounts[key] = (dayCounts[key] || 0) + 1;
            }
        });

        const calendar = [];
        const today = new Date();
        for (let i = 364; i >= 0; i--) {
            const date = new Date(today);
            date.setDate(date.getDate() - i);
            const dateString = date.toISOString().split('T')[0];
            const count = dayCounts[dateString] || 0;
            let level = 0;
            if (count > 0 && count <= 2) level = 1;
            else if (count <= 5) level = 2;
            else if (count <= 10) level = 3;
            else if (count > 10) level = 4;
            calendar.push({ date: dateString, count, level });
        }

        const totalActiveDays = Object.keys(dayCounts).length;

        res.status(200).send({ calendar, totalActiveDays });
    } catch (err) {
        console.error('Stats heatmap error:', err);
        res.status(500).send('Error fetching heatmap stats: ' + err.message);
    }
};

module.exports = {
    getStatsOverview,
    getStatsDifficulty,
    getStatsTags,
    getStatsTimeline,
    getStatsHeatmap,
};
