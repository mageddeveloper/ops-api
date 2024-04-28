import { body } from "express-validator";

export const flowStepRequest = [
  // Validate order field
  body("order")
    .notEmpty()
    .withMessage("Order field is required")
    .isNumeric()
    .withMessage("Order field must be numeric"),

  // Validate channel field
  body("channel")
    .notEmpty()
    .withMessage("Channel field is required")
    .isString()
    .withMessage("Channel field must be a string"),

  // Validate responseHandler field (optional)
  body("responseHandler")
    .optional()
    .isString()
    .withMessage("Response handler field must be a string"),

  // Validate interval field
  body("interval")
    .notEmpty()
    .withMessage("Interval field is required")
    .isNumeric()
    .withMessage("Interval field must be numeric"),

  // Validate messageTemplate field
  body("messageTemplate")
    .notEmpty()
    .withMessage("Message template field is required")
    .isMongoId()
    .withMessage("Invalid message template ID"),

  // Validate ConfirmationFlow field
  body("confirmationFlow")
    .notEmpty()
    .withMessage("Confirmation flow field is required")
    .isMongoId()
    .withMessage("Invalid confirmation flow ID"),
];
