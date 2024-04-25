// flowStep.js
import mongoose from "mongoose";

const { Schema, model } = mongoose;

const activeChannels = Object.entries(communicationChannels)
  .filter(([channel, isActive]) => isActive)
  .map(([channel]) => channel);

const flowStepSchema = new Schema(
  {
    order: {
      type: Number,
      required: true,
    },
    channel: {
      type: String,
      enum: activeChannels,
      required: true,
    },
    messageTemplate: {
      type: Schema.Types.ObjectId,
      ref: "MessageTemplate",
      required: true,
    },
    responseHandler: {
      type: String,
    },
    interval: {
      type: Number,
      required: true,
      default: 60, // Default interval between retry attempts in seconds for this step
    },
  },
  {
    timestamps: true,
  }
);

const FlowStep = model("FlowStep", flowStepSchema);

export default FlowStep;
