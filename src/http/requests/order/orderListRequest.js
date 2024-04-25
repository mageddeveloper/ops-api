import { body } from "express-validator";

export const orderListRequest = [
  // Validate orderExternalId
  body("appId").notEmpty().withMessage("App ID is required"),

];
