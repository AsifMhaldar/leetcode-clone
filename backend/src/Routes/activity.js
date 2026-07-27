const express = require('express');
const activityRouter = express.Router();
const userMiddleware = require('../middleware/userMiddleware');
const {
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
    getLeaderboardPreview
} = require('../controllers/activity');

activityRouter.get('/feed', userMiddleware, getEnhancedFeed);
activityRouter.post('/create', userMiddleware, createActivity);
activityRouter.post('/:activityId/like', userMiddleware, toggleLike);
activityRouter.post('/:activityId/comment', userMiddleware, addComment);
activityRouter.post('/:activityId/save', userMiddleware, toggleSave);
activityRouter.post('/:activityId/share', incrementShare);
activityRouter.get('/suggested', userMiddleware, getSuggestedUsers);
activityRouter.get('/trending', getTrendingProblems);
activityRouter.get('/daily-challenge', getDailyChallenge);
activityRouter.get('/active-friends', userMiddleware, getActiveFriends);
activityRouter.get('/leaderboard-preview', getLeaderboardPreview);

module.exports = activityRouter;
