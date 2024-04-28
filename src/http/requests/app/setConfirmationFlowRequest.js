import { body } from "express-validator";
import * as appService from "@services/appService.js";
import * as confirmationFlowService from "@services/confirmationFlowService.js";

export const setConfirmationFlowRequest = [
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

  body("confirmationFlowId")
    .notEmpty()
    .withMessage("Confirmation Flow ID is required")
    .custom(async (value, { req }) => {
      // Check if the app exists
      const conf = await confirmationFlowService.getById(value);
      if (!conf) {
        throw new Error(
          "Confirmation flow with the provided ID does not exist"
        );
      }

      // Return true if validation passes
      return true;
    }),
];
