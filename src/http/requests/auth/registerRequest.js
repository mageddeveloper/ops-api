import { body } from 'express-validator';

export const registerRequest = 
[
    body('username').trim().notEmpty().withMessage('Username is required'),
    body('email').trim().notEmpty().withMessage('Email is required'),
    body('password').trim().isLength({ min: 8 }).withMessage('Password must be at least 8 characters'),
]
