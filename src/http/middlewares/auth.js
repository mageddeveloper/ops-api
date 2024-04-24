import dotenv from 'dotenv'
import jwt from "jsonwebtoken";
import User from '@models/User.js';

dotenv.config()

const verifyToken = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    // Fetch user from database based on userId
    req.user = await User.findById(req.userId);
    
    next();
  } catch (error) {
    return res.status(403).json({ message: 'Unauthorized: Invalid token' });
  }
};

export default verifyToken;
