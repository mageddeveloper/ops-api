import MessageTemplate from "@models/MessageTemplate.js";
import * as appService from "@services/appService.js";

export const list = async (filters) => {
  try {
    // Construct query object to hold filter criteria
    const query = {};

    if (filters) {
      // Implement logic to apply filters to the query
    }

    // Retrieve MessageTemplate from the database based on the filters
    const MessageTemplateList = await MessageTemplate.find(query);

    return MessageTemplateList;
  } catch (error) {
    // Handle errors
    throw new Error("Failed to fetch MessageTemplate list");
  }
};

export const create = async ({ channelType, content, placeholders, appId }) => {
  try {
    const app = await appService.getById(appId);

    if (!app) {
      throw new Error("App with the provided ID does not exist");
    }

    // Create a new MessageTemplate instance with the provided data
    const newMessageTemplate = new MessageTemplate({
      channelType,
      content,
      placeholders,
      appId,
    });

    // Save the new MessageTemplate instance to the database
    await newMessageTemplate.save();

    return newMessageTemplate;
  } catch (error) {
    // Handle errors
    throw new Error("Failed to create MessageTemplate");
  }
};

export const getById = async (id) => {
  try {
    // Retrieve a MessageTemplate by its ID from the database
    const messagetemplate = await MessageTemplate.findById(id);

    return messagetemplate;
  } catch (error) {
    // Handle errors
    throw new Error("Failed to fetch MessageTemplate by ID");
  }
};

export const updateById = async (id, newData) => {
  try {
    // Update the MessageTemplate with the provided ID using the new data
    const updatedMessageTemplate = await MessageTemplate.findByIdAndUpdate(
      id,
      newData,
      { new: true }
    );

    return updatedMessageTemplate;
  } catch (error) {
    // Handle errors
    throw new Error("Failed to update MessageTemplate");
  }
};

export const deleteById = async (id) => {
  try {
    // Delete the MessageTemplate with the provided ID from the database
    await MessageTemplate.findByIdAndDelete(id);

    // Return a success message or any desired response
    return { message: "MessageTemplate deleted successfully" };
  } catch (error) {
    // Handle errors
    throw new Error("Failed to delete MessageTemplate");
  }
};
