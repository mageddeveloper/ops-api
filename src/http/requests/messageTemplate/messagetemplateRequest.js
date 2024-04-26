import { body } from "express-validator";
import * as appService from "@services/appService.js";

export const messagetemplateRequest = [
  // Validate channelType
  body("channelType").notEmpty().withMessage("Channel type is required"),

  // Validate content
  body("content").notEmpty().withMessage("Content is required"),

  // Validate placeholders
  body("placeholders")
    .isArray({ min: 1 })
    .withMessage("At least one placeholder is required")
    .custom((value, { req }) => {
      // Check if all placeholders are strings
      const invalidPlaceholders = value.filter(
        (placeholder) => typeof placeholder !== "string"
      );
      if (invalidPlaceholders.length > 0) {
        throw new Error("Placeholders must be strings");
      }

      // Additional custom validation logic can be added here if needed

      // Return true if validation passes
      return true;
    }),

  // Validate appId
  body("appId")
    .notEmpty()
    .withMessage("App ID is required")
    .custom(async (value, { req }) => {
      // Check if the app exists
      const app = await appService.getById(value);
      if (!app) {
        throw new Error("App with the provided ID does not exist");
      }

      // Return true if validation passes
      return true;
    }),
];
