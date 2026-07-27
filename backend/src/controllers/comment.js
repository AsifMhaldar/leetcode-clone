const Comment = require('../models/comment');

const getCommentsByProblem = async (req, res) => {
    try {
        const { problemId } = req.params;
        const { sort = 'newest' } = req.query;

        const sortOption = sort === 'upvoted'
            ? { createdAt: -1 }
            : { createdAt: -1 };

        const comments = await Comment.find({ problemId, parentCommentId: null })
            .sort(sortOption)
            .populate('userId', 'firstName lastName emailId')
            .lean();

        const commentIds = comments.map(c => c._id);
        const replies = await Comment.find({ parentCommentId: { $in: commentIds } })
            .sort({ createdAt: 1 })
            .populate('userId', 'firstName lastName emailId')
            .lean();

        const repliesMap = {};
        replies.forEach(r => {
            const parentId = r.parentCommentId.toString();
            if (!repliesMap[parentId]) repliesMap[parentId] = [];
            repliesMap[parentId].push(r);
        });

        const result = comments.map(c => ({
            ...c,
            replies: repliesMap[c._id.toString()] || []
        }));

        if (sort === 'upvoted') {
            result.sort((a, b) => (b.upvotes?.length || 0) - (a.upvotes?.length || 0));
        }

        res.status(200).json({ comments: result });
    } catch (err) {
        res.status(500).send('Error fetching comments: ' + err.message);
    }
};

const createComment = async (req, res) => {
    try {
        const { problemId, content, parentCommentId } = req.body;
        const userId = req.result._id;

        if (!content || !problemId) {
            return res.status(400).send('Content and problemId are required');
        }

        if (content.length > 5000) {
            return res.status(400).send('Comment cannot exceed 5000 characters');
        }

        const comment = await Comment.create({
            problemId,
            userId,
            content,
            parentCommentId: parentCommentId || null
        });

        const populated = await comment.populate('userId', 'firstName lastName emailId');
        res.status(201).json({ comment: populated });
    } catch (err) {
        res.status(500).send('Error creating comment: ' + err.message);
    }
};

const updateComment = async (req, res) => {
    try {
        const { commentId } = req.params;
        const { content } = req.body;
        const userId = req.result._id;

        if (!content) {
            return res.status(400).send('Content is required');
        }

        if (content.length > 5000) {
            return res.status(400).send('Comment cannot exceed 5000 characters');
        }

        const comment = await Comment.findById(commentId);
        if (!comment) {
            return res.status(404).send('Comment not found');
        }

        if (comment.userId.toString() !== userId.toString()) {
            return res.status(403).send('You can only edit your own comments');
        }

        comment.content = content;
        await comment.save();

        const populated = await comment.populate('userId', 'firstName lastName emailId');
        res.status(200).json({ comment: populated });
    } catch (err) {
        res.status(500).send('Error updating comment: ' + err.message);
    }
};

const deleteComment = async (req, res) => {
    try {
        const { commentId } = req.params;
        const userId = req.result._id;
        const userRole = req.result.role;

        const comment = await Comment.findById(commentId);
        if (!comment) {
            return res.status(404).send('Comment not found');
        }

        if (comment.userId.toString() !== userId.toString() && userRole !== 'admin') {
            return res.status(403).send('Not authorized to delete this comment');
        }

        await Comment.deleteMany({ parentCommentId: commentId });
        await Comment.findByIdAndDelete(commentId);

        res.status(200).json({ message: 'Comment deleted successfully' });
    } catch (err) {
        res.status(500).send('Error deleting comment: ' + err.message);
    }
};

const toggleUpvote = async (req, res) => {
    try {
        const { commentId } = req.params;
        const userId = req.result._id;

        const comment = await Comment.findById(commentId);
        if (!comment) {
            return res.status(404).send('Comment not found');
        }

        const index = comment.upvotes.indexOf(userId);
        if (index > -1) {
            comment.upvotes.splice(index, 1);
        } else {
            comment.upvotes.push(userId);
        }

        await comment.save();

        res.status(200).json({
            upvoted: index === -1,
            upvoteCount: comment.upvotes.length
        });
    } catch (err) {
        res.status(500).send('Error toggling upvote: ' + err.message);
    }
};

module.exports = {
    getCommentsByProblem,
    createComment,
    updateComment,
    deleteComment,
    toggleUpvote
};
