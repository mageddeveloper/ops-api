import dotenv from 'dotenv'
import jwt from "jsonwebtoken";
import User from '@models/User.js';

dotenv.config()

const verifyToken = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  console.log(req.headers)
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: Please login first' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    // Fetch user from database based on userId
    req.user = await User.findById(req.userId);
    
    next();
  } catch (error) {
    return res.status(403).json({ message: 'Unauthorized: please login first' });
  }
};

export default verifyToken;
