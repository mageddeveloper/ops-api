import mongoose from "mongoose";

const { Schema, model } = mongoose;

const activeChannels = Object.entries(communicationChannels)
  .filter(([channel, isActive]) => isActive)
  .map(([channel]) => channel);

const confirmationStatuses = [
  "pending",
  "confirmed",
  "rejected",
];

const confirmationAttemptSchema = new Schema(
  {
    orderId: {
      type: Schema.Types.ObjectId,
      ref: "Order",
      required: true,
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
    channel: {
      type: String,
      enum: activeChannels,
      required: true,
    },
    messageContent: {
      type: String,
      required: true,
    },
    responseStatus: {
      type: String,
      enum: confirmationStatuses,
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

const ConfirmationAttempt = model(
  "ConfirmationAttempt",
  confirmationAttemptSchema
);

export default ConfirmationAttempt;
