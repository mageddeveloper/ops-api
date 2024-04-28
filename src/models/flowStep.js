// flowStep.js
import mongoose from "mongoose";

const { Schema, model } = mongoose;

import { communicationChannels } from '@config/channels.js';

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
    responseHandler: {
      type: String,
    },
    interval: {
      type: Number,
      required: true,
      default: 60, 
    },
    messageTemplate: {
      type: Schema.Types.ObjectId,
      ref: "MessageTemplate",
      required: true,
    },
    confirmationFlow: {
      type: Schema.Types.ObjectId,
      ref: "ConfirmationFlow",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const FlowStep = model("FlowStep", flowStepSchema);

export default FlowStep;
