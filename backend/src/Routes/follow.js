const express = require('express');
const followRouter = express.Router();
const userMiddleware = require('../middleware/userMiddleware');
const {
    toggleFollow,
    getFollowers,
    getFollowing,
    getFeed,
    getPublicProfile
} = require('../controllers/follow');

followRouter.post('/follow/:targetId', userMiddleware, toggleFollow);
followRouter.get('/followers/:userId', getFollowers);
followRouter.get('/following/:userId', getFollowing);
followRouter.get('/feed', userMiddleware, getFeed);
followRouter.get('/public/:userId', getPublicProfile);

module.exports = followRouter;
