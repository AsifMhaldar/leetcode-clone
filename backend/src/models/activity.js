const mongoose = require('mongoose');
const { Schema } = mongoose;

const activitySchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    type: {
        type: String,
        enum: ['solved', 'streak', 'badge', 'shared', 'discussed'],
        required: true
    },
    problemId: {
        type: Schema.Types.ObjectId,
        ref: 'problem'
    },
    content: {
        type: String,
        default: ''
    },
    codeSnippet: {
        type: String,
        default: ''
    },
    likes: [{
        type: Schema.Types.ObjectId,
        ref: 'user'
    }],
    comments: [{
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'user'
        },
        content: String,
        createdAt: {
            type: Date,
            default: Date.now
        }
    }],
    saves: [{
        type: Schema.Types.ObjectId,
        ref: 'user'
    }],
    shares: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

activitySchema.index({ userId: 1, createdAt: -1 });
activitySchema.index({ createdAt: -1 });

const Activity = mongoose.model('activity', activitySchema);

module.exports = Activity;
