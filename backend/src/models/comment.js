const mongoose = require('mongoose');
const { Schema } = mongoose;

const commentSchema = new Schema({
    problemId: {
        type: Schema.Types.ObjectId,
        ref: 'problem',
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    content: {
        type: String,
        required: true,
        maxLength: 5000
    },
    parentCommentId: {
        type: Schema.Types.ObjectId,
        ref: 'comment',
        default: null
    },
    upvotes: [{
        type: Schema.Types.ObjectId,
        ref: 'user'
    }]
}, { timestamps: true });

commentSchema.index({ problemId: 1, createdAt: -1 });

const Comment = mongoose.model('comment', commentSchema);

module.exports = Comment;
