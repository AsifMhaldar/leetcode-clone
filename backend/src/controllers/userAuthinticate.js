const redisClient = require("../config/redis");
const Submission = require("../models/submission");
const User = require("../models/user");  // this is schema to imoprt in this file
const validate = require("../utils/validate");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')


// Register feature
const register = async (req, res)=>{
    try{

        // validate the data

        validate(req.body);  // this req.body is pass to validate function

        const {firstName, emailId, password} = req.body;
        req.body.password = await bcrypt.hash(password, 10);
        req.body.role = 'user';

        const user = await User.create(req.body);

        const token = jwt.sign({_id:user._id, emailId:emailId, role: 'user'}, process.env.JWT_KEY, {expiresIn: 60*60});
        
        const reply = {
            firstName:user.firstName,
            emailId:user.emailId,
            _id:user._id
        }

        res.cookie('token', token, {maxAge : 60*60*1000});
        res.status(201).json({
            user:reply,
            message:"LogIn Successfully"
        })

        // const ans = User.exists({emailId});    // check email is already exists or not

    }catch(err){
        res.status(400).send("Error: "+err);
    }
}


//LogIn feature
const login = async(req, res)=>{
    try{
        const {emailId, password} = req.body;

        if(!emailId){
            throw new Error("Invalid credientials...");
        }

        if(!password){
            throw new Error("Invalid credientials...");
        }

        const user = await User.findOne({emailId});
        const match = await bcrypt.compare(password, user.password);

        if(!match){
            throw new Error("Invalid credientials...");
        }

        const reply = {
            firstName:user.firstName,
            emailId:user.emailId,
            _id:user._id
        }

        const token = jwt.sign({_id:user._id, emailId:emailId, role: user.role}, process.env.JWT_KEY, {expiresIn: 60*60});
        res.cookie('token', token, {maxAge : 60*60*1000});
        res.status(201).json({
            user:reply,
            message:"LogIn Successfully"
        })

    }
    catch(err){
        res.status(401).send("Error: "+err);
    }
}

// LogOut Feature
const logout = async (req, res)=>{

    try{
        const {token} = req.cookies;

        const payload = jwt.decode(token);
        

        await redisClient.set(`token:${token}`, "Blocked");
        await redisClient.expireAt(`token:${token}`, payload.exp);


        res.cookie("token", null, {expires: new Date(Date.now())}); 
        res.send("Logged Out Successfully...");

        // token add into redis blocklist
        // after that clear the cookies
    }
    catch(err){
        res.status(503).send("Error: "+err);
    }   

}

const adminRegister = async(req, res)=>{

    try{

        // validate the data

        validate(req.body);  // this req.body is pass to validate function
        const {firstName, emailId, password} = req.body;
        req.body.password = await bcrypt.hash(password, 10);
        // req.body.role = 'admin';

        const user = await User.create(req.body);

        const token = jwt.sign({_id:user._id, emailId:emailId, role:user.role}, process.env.JWT_KEY, {expiresIn: 60*60});
        res.cookie('token', token, {maxAge : 60*60*1000});
        res.status(201).send("User Registered Succefully...");

        // const ans = User.exists({emailId});    // check email is already exists or not

        
    }catch(err){
        res.status(400).send("Error: "+err);
    }

}


const deleteProfile = async(req, res)=>{

    try{
        const userId = req.result._id;

        await User.findByIdAndDelete(userId); // userSchema delete

        // submission se bhi delete krdo
        await Submission.deleteMany({userId});

        res.status(200).send("Deleted Successfully..")

    }catch(err){
        res.status(500).send("Internal Server Error..");
    }

}


module.exports = {register, login, logout, adminRegister, deleteProfile};