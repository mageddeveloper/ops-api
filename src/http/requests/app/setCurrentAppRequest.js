import { body } from "express-validator";
import * as appService from "@services/appService.js";

export const setCurrentAppRequest = [
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
