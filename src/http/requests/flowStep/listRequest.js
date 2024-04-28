import { body } from "express-validator";
import * as confirmationFlowService from "@services/confirmationFlowService.js";

export const listRequest = [
  // Validate appId
  body("confirmationFlow")
    .notEmpty()
    .withMessage("Confirmation Flow is required")
    .custom(async (value, { req }) => {
      // Check if the app exists
      const confirmationFlow = await confirmationFlowService.getById(value);
      if (!confirmationFlow) {
        throw new Error("Confirmation flow with the provided ID does not exist");
      }

      // Return true if validation passes
      return true;
    }),
];
