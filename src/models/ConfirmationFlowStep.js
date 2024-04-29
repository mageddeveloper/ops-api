import mongoose from "mongoose";

const { Schema, model } = mongoose;

// Define the schema for confirmation flow steps
const confirmationFlowStepSchema = new Schema(
  {
    order: {
      type: Schema.Types.ObjectId,
      ref: "Order",
      required: true,
    },
    step: {
      type: Schema.Types.ObjectId,
      ref: "FlowStep", // Reference to the FlowStep model
      required: true,
    },
    executionDate: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "executed"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

// Create a model for confirmation flow steps
const ConfirmationFlowStep = model(
  "ConfirmationFlowStep",
  confirmationFlowStepSchema
);

export default ConfirmationFlowStep;
