const express = require('express');
const app = express();
require('dotenv').config();
const http = require('http');
const { Server } = require('socket.io');
const main = require('./config/db');
const cookieParser = require('cookie-parser');
const authRouter = require('./Routes/userAuth');
const problemRouter = require('./Routes/problemCreator');
const submitRouter = require('./Routes/submit');
const aiRouter = require('./Routes/aiChatting');
const videoRouter = require('./Routes/videoCreator');
const adminDashboardRouter = require('./Routes/adminDashboard');
const userStatsRouter = require('./Routes/userStats');
const leaderboardRouter = require('./Routes/leaderboard');
const commentRouter = require('./Routes/comment');
const followRouter = require('./Routes/follow');
const activityRouter = require('./Routes/activity');
const cors = require('cors');

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ['http://localhost:5173'],
    credentials: true
  }
});

app.use(cors({
    origin: ['http://localhost:5173'],
    credentials:true
}));

app.use(cookieParser());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

app.use('/user', authRouter);
app.use('/problem', problemRouter);
app.use('/submission', submitRouter);
app.use('/ai', aiRouter);
app.use('/video',videoRouter);
app.use('/admin', adminDashboardRouter);
app.use('/user/stats', userStatsRouter);
app.use('/leaderboard', leaderboardRouter);
app.use('/comment', commentRouter);
app.use('/user', followRouter);
app.use('/activity', activityRouter);

io.on('connection', (socket) => {
  socket.on('join-feed', (userId) => {
    if (userId) socket.join(`user:${userId}`);
  });
  socket.on('leave-feed', (userId) => {
    if (userId) socket.leave(`user:${userId}`);
  });
});

app.set('io', io);

const initializedConnection = async () => {
    try {
        await Promise.all([main()]);
        console.log("DB connected...");
        server.listen(process.env.PORT, () => {
            console.log("Server listening at port " + process.env.PORT);
        });
    } catch (err) {
        console.log("Error: " + err);
    }
};

initializedConnection();
