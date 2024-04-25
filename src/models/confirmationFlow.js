import mongoose from "mongoose";

const { Schema, model } = mongoose;

const confirmationFlowSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    steps: [
      {
        type: Schema.Types.ObjectId,
        ref: "FlowStep",
      },
    ],
    appId: {
      type: Schema.Types.ObjectId,
      ref: "App",
      required: true,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User", 
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const ConfirmationFlow = model("ConfirmationFlow", confirmationFlowSchema);

export default ConfirmationFlow;
