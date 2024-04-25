import { body } from "express-validator";

export const appRequest = [
  // Define validation rules for app request
  body("appName").trim().notEmpty().withMessage("App name is required"),
];
