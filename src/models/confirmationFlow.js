import mongoose from "mongoose";
import flowStepSchema from "./flowStep";

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
    steps: [{
      type: Schema.Types.ObjectId,
      ref: 'FlowStep'
    }] 
  },
  {
    timestamps: true,
  }
);

const ConfirmationFlow = model("ConfirmationFlow", confirmationFlowSchema);

export default ConfirmationFlow;
