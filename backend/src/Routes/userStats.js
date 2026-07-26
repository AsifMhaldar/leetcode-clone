const express = require('express');
const statsRouter = express.Router();
const userMiddleware = require('../middleware/userMiddleware');
const {
    getStatsOverview,
    getStatsDifficulty,
    getStatsTags,
    getStatsTimeline,
    getStatsHeatmap,
} = require('../controllers/userStats');

statsRouter.get('/overview', userMiddleware, getStatsOverview);
statsRouter.get('/difficulty', userMiddleware, getStatsDifficulty);
statsRouter.get('/tags', userMiddleware, getStatsTags);
statsRouter.get('/timeline', userMiddleware, getStatsTimeline);
statsRouter.get('/heatmap', userMiddleware, getStatsHeatmap);

module.exports = statsRouter;
