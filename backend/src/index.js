const express = require('express');
const app = express();
require('dotenv').config();
const main = require('./config/db');
const cookieParser = require('cookie-parser');
const authRouter = require('./Routes/userAuth');
const redisClient = require('./config/redis');
const problemRouter = require('./Routes/problemCreator');
const submitRouter = require('./Routes/submit');
const aiRouter = require('./Routes/aiChatting');
const videoRouter = require('./Routes/videoCreator');
const cors = require('cors');


app.use(cors({
    origin: ['http://localhost:5173',"https://fullstackleetcode.netlify.app/"],// '*'  multiple accesses
    credentials:true
}));


app.use(express.json());  // this is used for the convert the data into javascript object
app.use(cookieParser());

app.use('/user', authRouter);
app.use('/problem', problemRouter);
app.use('/submission', submitRouter);
app.use('/ai', aiRouter);
app.use('/video',videoRouter);


const initializedConnection = async(req, res)=>{

    try{
        
        await Promise.all([main(), redisClient.connect()]);
        console.log("DB connected...");
        app.listen(process.env.PORT, ()=>{
            console.log("Server listening at port "+process.env.PORT);
        })

    }
    catch(err){
        console.log("Error: "+err);
    }

}

initializedConnection();

// main()
// .then(async ()=>{
//     app.listen(process.env.PORT, ()=>{
//     console.log("Server Listening at port number: "+ process.env.PORT);
//     })
// })
// .catch(err=> console.log("Error Occurred: "+err));