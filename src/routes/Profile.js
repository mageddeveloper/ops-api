import express from 'express';
import { getUserProfile, updateUserProfile } from '@controllers/profileController.js';
import verifyToken from '@middlewares/auth.js';

const router = express.Router();

// Route to get user profile
router.get('/', verifyToken, getUserProfile);

// Route to update user profile
router.put('/', verifyToken, updateUserProfile);

export default router;
