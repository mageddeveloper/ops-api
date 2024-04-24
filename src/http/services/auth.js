import User from "@models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sendEmail } from "@utils/email.js";
import dotenv from 'dotenv'
import config from '@config/environment.js';

dotenv.config()

// service.js
import User from './models/User';
import bcrypt from 'bcrypt';

export const register = async (data) => {
  const existingUser = await User.findOne({ email: data.email });
  if (existingUser) {
    throw new Error('Email already exists');
  }

  const newUser = new User(data);
  await newUser.save();
  return newUser;
};

export const login = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('Invalid email address');
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error('Invalid password');
  }

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  return { token, user };
};

export const forgotPassword = async (email) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('Email not found');
  }

  const resetToken = jwt.sign({ userId: user._id }, process.env.JWT_RESET_SECRET, { expiresIn: '30m' });
  const resetUrl = `${config.frontendUrl}/reset-password/${resetToken}`;

  await sendEmail(email, 'Password Reset', `Click here to reset your password: ${resetUrl}`);
};

export const resetPassword = async (token, password) => {
  const decoded = jwt.verify(token, process.env.JWT_RESET_SECRET);
  const user = await User.findById(decoded.userId);
  if (!user) {
    throw new Error('Invalid token');
  }

  user.password = password;
  await user.save();
};

// ... other authentication functions (e.g., verify email)

