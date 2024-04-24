import { body } from 'express-validator';
import User from '@models/User.js';

export const registerRequest = 
[
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('password').trim().isLength({ min: 8 }).withMessage('Password must be at least 8 characters'),
]
