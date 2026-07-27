const express = require('express');
const leaderboardRouter = express.Router();
const userMiddleware = require('../middleware/userMiddleware');
const {
    getGlobalLeaderboard,
    getWeeklyLeaderboard,
    getMonthlyLeaderboard,
    getTagLeaderboard,
    getUserRank
} = require('../controllers/leaderboard');

leaderboardRouter.get('/global', getGlobalLeaderboard);
leaderboardRouter.get('/weekly', getWeeklyLeaderboard);
leaderboardRouter.get('/monthly', getMonthlyLeaderboard);
leaderboardRouter.get('/tag/:tag', getTagLeaderboard);
leaderboardRouter.get('/rank/:userId', getUserRank);

module.exports = leaderboardRouter;
