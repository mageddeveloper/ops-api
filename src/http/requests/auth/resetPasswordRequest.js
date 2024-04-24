import { body } from 'express-validator';

export const resetPasswordRequest = [
    body('token').notEmpty().withMessage('Token is required'),
    body('password').trim().isLength({ min: 8 }).withMessage('Password must be at least 8 characters'),  
];
