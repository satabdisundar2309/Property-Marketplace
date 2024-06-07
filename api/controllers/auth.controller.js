import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config()


// signun user
export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(401).json({
      success: false,
      message: "Fill the form properly",
    });
  }
  const isUsername = await User.findOne({ username: username });
  const isEmail = await User.findOne({ email: email });
  if (isUsername) {
    return res.status(401).json({
      success: false,
      message: "Username already taken",
    });
  }
  if (isEmail) {
    return res.status(401).json({
      success: false,
      message: "Email already exists",
    });
  }
  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({ username, email, password: hashedPassword });
  try {
    await newUser.save();
    res.status(201).json({
      success: true,
      message: "User registered successfully",
    });
  } catch (error) {
    next(error);
  }
};

// signin user
export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(401).json({
      success: false,
      message: "Fill the form properly",
    });
  }
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES });
    res.status(200).json({
      token: token,
      success: true,
      message: "Logged in successfully",
      user: {
        _id: validUser._id,
        username: validUser.username,
        email: validUser.email,
        avatar: validUser.avatar,
        createdAt: validUser.createdAt,
        updatedAt: validUser.updatedAt
      }
    });
  } catch (error) {
    next(error);
  }
};

export const google = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES });
      res.status(200).json({
        token: token,
        success: true,
        message: "Welcome!!!",
        user: {
          _id: user._id,
          username: user.username,
          email: user.email,
          avatar: user.avatar,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt
        }
      });
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
      const newUser = new User({
        username:
          req.body.name.split(' ').join('').toLowerCase() +
          Math.random().toString(36).slice(-4),
        email: req.body.email,
        password: hashedPassword,
        avatar: req.body.photo,
      });
      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES });
      res.status(200).json({
        token: token,
        success: true,
        message: "Welcome!!!",
        user: {
          _id: newUser._id,
          username: newUser.username,
          email: newUser.email,
          avatar: newUser.avatar,
          createdAt: newUser.createdAt,
          updatedAt: newUser.updatedAt
        }
      });
    }
  } catch (error) {
    next(error);
  }
};

export const signOut = async (req, res, next) => {
  try {
    res.status(200).json({
      success: true,
      message: "Logged out successfully"
    });
  } catch (error) {
    next(error);
  }
};
