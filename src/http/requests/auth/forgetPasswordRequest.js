import { body } from 'express-validator';

export const forgetPasswordRequest = [
    body('email')
        .trim()
        .isEmail().withMessage('Invalid email')
        .exists().withMessage('Email is required')
];
