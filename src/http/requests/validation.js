import { validationResult } from 'express-validator';

export const validate = (validations) => async (req, res, next) => {
  try {
    // Run validation rules
    await Promise.all(validations.map(validation => validation.run(req)));

    // Check for validation errors
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const extractedErrors = errors.array().map(error => ({
        [error.path]: error.msg,
      }));

      return res.status(422).json({ message: 'Validation failed', errors: extractedErrors });
    }
    
    next();
  } catch (error) {
    next(error);
  }
};
