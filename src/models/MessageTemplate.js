import mongoose from "mongoose";

const { Schema, model } = mongoose;

const messageTemplateSchema = new Schema(
  {
    channelType: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    placeholders: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const MessageTemplate = model("MessageTemplate", messageTemplateSchema);

export default MessageTemplate;
