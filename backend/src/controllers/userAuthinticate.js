const redisClient = require("../config/redis");
const Submission = require("../models/submission");
const User = require("../models/user");
const validate = require("../utils/validate");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// detect environment
const isProduction = process.env.NODE_ENV === "production";

// common cookie options
const cookieOptions = {
  httpOnly: true,
  secure: isProduction,                 // true in production (https)
  sameSite: isProduction ? "none" : "lax", // none for Netlify+Render
  maxAge: 60 * 60 * 1000, // 1 hour
};

// Register feature
const register = async (req, res) => {
  try {
    validate(req.body);

    const { firstName, emailId, password } = req.body;
    req.body.password = await bcrypt.hash(password, 10);
    req.body.role = "user";

    const user = await User.create(req.body);

    const token = jwt.sign(
      { _id: user._id, emailId: emailId, role: "user" },
      process.env.JWT_KEY,
      { expiresIn: 60 * 60 }
    );

    const reply = {
      firstName: user.firstName,
      emailId: user.emailId,
      _id: user._id,
    };

    res.cookie("token", token, cookieOptions);
    res.status(201).json({
      user: reply,
      message: "Login Successfully",
    });
  } catch (err) {
    res.status(400).send("Error: " + err);
  }
};

// Login feature
const login = async (req, res) => {
  try {
    const { emailId, password } = req.body;

    if (!emailId || !password) {
      throw new Error("Invalid credentials...");
    }

    const user = await User.findOne({ emailId });
    if (!user) {
      throw new Error("Invalid credentials...");
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      throw new Error("Invalid credentials...");
    }

    const reply = {
      firstName: user.firstName,
      emailId: user.emailId,
      _id: user._id,
    };

    const token = jwt.sign(
      { _id: user._id, emailId: emailId, role: user.role },
      process.env.JWT_KEY,
      { expiresIn: 60 * 60 }
    );

    res.cookie("token", token, cookieOptions);
    res.status(200).json({
      user: reply,
      message: "Login Successfully",
    });
  } catch (err) {
    res.status(401).send("Error: " + err);
  }
};

// Logout feature
const logout = async (req, res) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res.status(400).send("No token found");
    }

    const payload = jwt.decode(token);

    await redisClient.set(`token:${token}`, "Blocked");
    await redisClient.expireAt(`token:${token}`, payload.exp);

    res.cookie("token", null, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "none" : "lax",
      expires: new Date(Date.now()),
    });

    res.send("Logged Out Successfully...");
  } catch (err) {
    res.status(503).send("Error: " + err);
  }
};

// Admin Register
const adminRegister = async (req, res) => {
  try {
    validate(req.body);

    const { emailId, password } = req.body;
    req.body.password = await bcrypt.hash(password, 10);

    const user = await User.create(req.body);

    const token = jwt.sign(
      { _id: user._id, emailId: emailId, role: user.role },
      process.env.JWT_KEY,
      { expiresIn: 60 * 60 }
    );

    res.cookie("token", token, cookieOptions);
    res.status(201).send("User Registered Successfully...");
  } catch (err) {
    res.status(400).send("Error: " + err);
  }
};

// Delete Profile
const deleteProfile = async (req, res) => {
  try {
    const userId = req.result._id;

    await User.findByIdAndDelete(userId);
    await Submission.deleteMany({ userId });

    res.status(200).send("Deleted Successfully..");
  } catch (err) {
    res.status(500).send("Internal Server Error..");
  }
};

module.exports = {
  register,
  login,
  logout,
  adminRegister,
  deleteProfile,
};
