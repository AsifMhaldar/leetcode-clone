const mongoose = require('mongoose');
const { Schema } = mongoose;

const leaderboardSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true,
        unique: true
    },
    points: {
        type: Number,
        default: 0
    },
    easyCount: {
        type: Number,
        default: 0
    },
    mediumCount: {
        type: Number,
        default: 0
    },
    hardCount: {
        type: Number,
        default: 0
    },
    streak: {
        type: Number,
        default: 0
    },
    lastUpdated: {
        type: Date,
        default: Date.now
    }
});

leaderboardSchema.index({ points: -1 });

const Leaderboard = mongoose.model('leaderboard', leaderboardSchema);

module.exports = Leaderboard;
