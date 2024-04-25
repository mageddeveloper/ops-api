import { body } from "express-validator";

export const confirmationflowRequest = [
  // Validate name
  body("name").notEmpty().withMessage("Name is required"),

  // Validate description (optional)
  body("description")
    .optional()
    .isString()
    .withMessage("Description must be a string"),

  // Validate appId
  body("appId").notEmpty().withMessage("App ID is required"),
];
