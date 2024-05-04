import { validationResult } from 'express-validator';

export const validate = (validations) => async (req, res, next) => {
  try {
    // Run validation rules
    await Promise.all(validations.map(validation => validation.run(req)));

    // Check for validation errors
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const extractedErrors = {};
      errors.array().forEach(error => {
        const fieldName = error.path || error.msg; // Use param or message as the field name
        const errorMessage = error.msg;
        if (!extractedErrors[fieldName]) {
          extractedErrors[fieldName] = errorMessage;
        }
      });

      return res.status(422).json({ message: 'Validation failed', errors: extractedErrors });
    }
    
    next();
  } catch (error) {
    next(error);
  }
};
