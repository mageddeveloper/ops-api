import mongoose from "mongoose";
const { Schema, model } = mongoose;

const confirmationStatuses = ["pending", "confirmed", "rejected"];

const orderSchema = new Schema(
  {
    orderExternalId: {
      type: String,
      required: true,
    },
    customerId: {
      type: Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },
    appId: {
      type: Schema.Types.ObjectId,
      ref: "App",
      required: true,
    },
    orderDetails: {
      type: String,
      required: true,
    },
    confirmationStatus: {
      type: String,
      enum: confirmationStatuses,
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

const Order = model("Order", orderSchema);

export default Order;
