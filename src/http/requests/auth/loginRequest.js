import { body } from 'express-validator';

export const loginRequest = 
[
    body('email').trim().isEmail().withMessage('Invalid email'),
    body('password').trim().isLength({ min: 8 }).withMessage('Password must be at least 8 characters'),
]
