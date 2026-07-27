const express = require('express');
const commentRouter = express.Router();
const userMiddleware = require('../middleware/userMiddleware');
const {
    getCommentsByProblem,
    createComment,
    updateComment,
    deleteComment,
    toggleUpvote
} = require('../controllers/comment');

commentRouter.get('/problem/:problemId', getCommentsByProblem);
commentRouter.post('/', userMiddleware, createComment);
commentRouter.put('/:commentId', userMiddleware, updateComment);
commentRouter.delete('/:commentId', userMiddleware, deleteComment);
commentRouter.post('/:commentId/upvote', userMiddleware, toggleUpvote);

module.exports = commentRouter;
