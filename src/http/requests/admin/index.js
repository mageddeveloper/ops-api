import { param } from 'express-validator';

export const validateUserId = [
  param('userId').isUUID().withMessage('Invalid user ID format'),
];

