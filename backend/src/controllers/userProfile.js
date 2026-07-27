const User = require('../models/user');
const Submission = require('../models/submission');
const Problem = require('../models/problem');

const getProfile = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findById(id)
            .select('firstName lastName emailId role bio github linkedin website problemSolved createdAt')
            .lean();

        if (!user) {
            return res.status(404).send('User not found');
        }

        const solvedProblems = await Problem.find({ _id: { $in: user.problemSolved } })
            .select('difficulty')
            .lean();

        const allProblems = await Problem.countDocuments();

        const easySolved = solvedProblems.filter(p => p.difficulty === 'easy').length;
        const mediumSolved = solvedProblems.filter(p => p.difficulty === 'medium').length;
        const hardSolved = solvedProblems.filter(p => p.difficulty === 'hard').length;

        const totalEasy = await Problem.countDocuments({ difficulty: 'easy' });
        const totalMedium = await Problem.countDocuments({ difficulty: 'medium' });
        const totalHard = await Problem.countDocuments({ difficulty: 'hard' });

        const submissions = await Submission.find({ userId: id })
            .select('status language createdAt problemId')
            .populate('problemId', 'title difficulty')
            .sort({ createdAt: -1 })
            .lean();

        const totalSubmissions = submissions.length;
        const acceptedSubmissions = submissions.filter(s => s.status === 'accepted').length;
        const acceptanceRate = totalSubmissions > 0 ? Math.round((acceptedSubmissions / totalSubmissions) * 100) : 0;

        const languageMap = {};
        submissions.forEach(sub => {
            if (sub.language) {
                languageMap[sub.language] = (languageMap[sub.language] || 0) + 1;
            }
        });
        const languages = Object.entries(languageMap)
            .map(([name, count]) => ({ name, count }))
            .sort((a, b) => b.count - a.count);

        const activeDates = new Set();
        submissions.forEach(sub => {
            if (sub.createdAt) {
                const date = new Date(sub.createdAt);
                activeDates.add(date.toISOString().split('T')[0]);
            }
        });

        const calendar = [];
        const today = new Date();
        for (let i = 364; i >= 0; i--) {
            const date = new Date(today);
            date.setDate(date.getDate() - i);
            const dateString = date.toISOString().split('T')[0];
            calendar.push({
                date: dateString,
                count: 0,
                accepted: 0,
                level: 0,
            });
        }

        submissions.forEach(sub => {
            if (sub.createdAt) {
                const dateString = new Date(sub.createdAt).toISOString().split('T')[0];
                const entry = calendar.find(c => c.date === dateString);
                if (entry) {
                    entry.count += 1;
                    if (sub.status === 'accepted') {
                        entry.accepted = (entry.accepted || 0) + 1;
                    }
                }
            }
        });

        calendar.forEach(entry => {
            if (entry.count === 0) entry.level = 0;
            else if (entry.count <= 2) entry.level = 1;
            else if (entry.count <= 5) entry.level = 2;
            else if (entry.count <= 10) entry.level = 3;
            else entry.level = 4;
        });

        let currentStreak = 0;
        let longestStreak = 0;
        let tempStreak = 0;
        const activeDatesArray = Array.from(activeDates).sort();

        const todayString = today.toISOString().split('T')[0];
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayString = yesterday.toISOString().split('T')[0];

        if (activeDates.has(todayString) || activeDates.has(yesterdayString)) {
            let checkDate = activeDates.has(todayString) ? new Date(yesterday) : new Date(yesterday);
            checkDate.setDate(checkDate.getDate() - (activeDates.has(todayString) ? 0 : 1));
            currentStreak = activeDates.has(todayString) ? 1 : 1;

            while (true) {
                const checkDateString = checkDate.toISOString().split('T')[0];
                if (activeDates.has(checkDateString)) {
                    currentStreak++;
                    checkDate.setDate(checkDate.getDate() - 1);
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

        const lastActive = activeDatesArray.length > 0 ? activeDatesArray[activeDatesArray.length - 1] : null;

        const reputation = (easySolved * 5) + (mediumSolved * 10) + (hardSolved * 20);

        const totalSolved = solvedProblems.length;
        const rank = await User.countDocuments({
            $expr: { $gt: [{ $size: '$problemSolved' }, totalSolved] }
        }) + 1;
        const totalUsers = await User.countDocuments();

        const recentSubmissions = submissions.slice(0, 10).map(sub => ({
            _id: sub._id,
            title: sub.problemId ? sub.problemId.title : 'Deleted Problem',
            difficulty: sub.problemId ? sub.problemId.difficulty : 'easy',
            status: sub.status,
            language: sub.language,
            createdAt: sub.createdAt,
        }));

        res.status(200).send({
            user: {
                _id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                emailId: user.emailId,
                role: user.role,
                bio: user.bio,
                github: user.github,
                linkedin: user.linkedin,
                website: user.website,
                createdAt: user.createdAt,
            },
            stats: {
                totalSolved: solvedProblems.length,
                totalProblems: allProblems,
                easySolved,
                mediumSolved,
                hardSolved,
                totalEasy,
                totalMedium,
                totalHard,
                totalSubmissions,
                acceptedSubmissions,
                acceptanceRate,
                reputation,
                rank,
                totalUsers,
            },
            languages,
            streak: {
                current: currentStreak,
                longest: longestStreak,
                lastActive,
            },
            calendar,
            recentSubmissions,
        });

    } catch (err) {
        console.error('Profile error:', err);
        res.status(500).send('Error fetching profile: ' + err.message);
    }
};

const updateProfile = async (req, res) => {
    try {
        const userId = req.result._id;
        const { firstName, lastName, bio, github, linkedin, website } = req.body;

        const updateData = {};
        if (firstName !== undefined) updateData.firstName = firstName;
        if (lastName !== undefined) updateData.lastName = lastName;
        if (bio !== undefined) updateData.bio = bio;
        if (github !== undefined) updateData.github = github;
        if (linkedin !== undefined) updateData.linkedin = linkedin;
        if (website !== undefined) updateData.website = website;

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            updateData,
            { new: true, runValidators: true }
        ).select('firstName lastName emailId role bio github linkedin website');

        if (!updatedUser) {
            return res.status(404).send('User not found');
        }

        res.status(200).send({
            user: updatedUser,
            message: 'Profile updated successfully',
        });

    } catch (err) {
        console.error('Profile update error:', err);
        res.status(500).send('Error updating profile: ' + err.message);
    }
};

module.exports = { getProfile, updateProfile };
