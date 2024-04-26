import { body } from "express-validator";

export const listRequest = [
  // Validate appId
  body("appId").notEmpty().withMessage("App ID is required"),
];
