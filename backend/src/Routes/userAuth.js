const express = require('express');

const authRouter = express.Router();
const {register, login, logout, adminRegister,deleteProfile} = require("../controllers/userAuthinticate");
const { getProfile, updateProfile } = require("../controllers/userProfile");
const userMiddleware = require('../middleware/userMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');


// register, login,logout, getProfile this all are controllers
authRouter.post("/register", register)
authRouter.post("/login", login)
authRouter.post("/logout", userMiddleware, logout)
authRouter.post("/admin/register", adminMiddleware,adminRegister); 
authRouter.delete("/deleteProfile", userMiddleware, deleteProfile);
authRouter.get('/check', userMiddleware, async (req, res)=>{

    const reply = {
        firstName:req.result.firstName,
        lastName:req.result.lastName,
        emailId:req.result.emailId,
        _id:req.result._id,
        role:req.result.role,
        bio:req.result.bio,
        github:req.result.github,
        linkedin:req.result.linkedin,
        website:req.result.website,
    }

    res.status(200).json({
        user:reply,
        message:"Valid User"
    })
})

authRouter.get('/profile/:id', userMiddleware, getProfile);
authRouter.put('/profile', userMiddleware, updateProfile);

// authRouter.post("/getProfile", getProfile)



module.exports = authRouter;
