import cron from "node-cron";
import FlowStep from "@models/FlowStep.js";
import ConfirmationFlowStep from "@models/ConfirmationFlowStep.js";
import * as executeFlowService from "@services/executeFlowService.js";

// Define your cron job
export const cronJob = async () => {
  try {
    // Fetch pending confirmation flow steps from the database
    const pendingSteps = await ConfirmationFlowStep.find({
      status: "pending",
      executionDate: { $lte: new Date() },
    })
      .populate("step")
      .populate("order");

    // Execute each pending step
    for (const step of pendingSteps) {
      const populatedStep = await FlowStep.findById(step.step._id).populate(
        "messageTemplate"
      );

      await executeFlowService.executeStep(populatedStep, step.order);

      // Update the status of the step to 'executed'
      await ConfirmationFlowStep.findByIdAndUpdate(step._id, {
        status: "executed",
      });
    }
  } catch (error) {
    console.error("Error executing cron job:", error);
  }
};
