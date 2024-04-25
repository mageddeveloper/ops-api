import App from "@models/App.js";
import * as confirmationFlowService from "@services/confirmationFlowService.js";

export const listConfirmationFlows = async (req, res) => {
  try {
    // Call the service function to retrieve ConfirmationFlows with filters
    const ConfirmationFlows = await confirmationFlowService.list(req.query);

    // Return the list of ConfirmationFlows in the response
    res.status(200).json(ConfirmationFlows);
  } catch (error) {
    // Handle errors
    res.status(500).json({
      message: "Failed to fetch ConfirmationFlows",
      error: error.message,
    });
  }
};

export const createConfirmationFlow = async (req, res) => {
  try {
    // Extract authenticated user ID from the request
    const createdBy = req.userId;

    // Extract appId from the request body
    const { appId, ...confirmationflowData } = req.body;

    // Check if the provided appId exists
    const app = await App.findById(appId);
    if (!app) {
      return res.status(404).json({ message: "App not found" });
    }

    // Prepare confirmation flow data including createdBy
    const dataWithCreatedBy = { ...confirmationflowData, createdBy, appId };

    // Call the service function to create the ConfirmationFlow
    const confirmationflow = await confirmationFlowService.create(dataWithCreatedBy);

    // Return the created ConfirmationFlow in the response
    res.status(201).json(confirmationflow);
  } catch (error) {
    // Handle errors
    res.status(500).json({
      message: "Failed to create ConfirmationFlow",
      error: error.message,
    });
  }
};

export const getConfirmationFlow = async (req, res) => {
  const confirmationflowId = req.params.id;

  try {
    const confirmationflow = await confirmationFlowService.getById(
      confirmationflowId
    );
    if (!confirmationflow) {
      return res.status(404).json({ message: "ConfirmationFlow not found" });
    }
    res.json(confirmationflow);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch ConfirmationFlow",
      error: error.message,
    });
  }
};

export const updateConfirmationFlow = async (req, res) => {
  const confirmationflowId = req.params.id;
  const newData = req.body;

  try {
    const updatedConfirmationFlow = await confirmationFlowService.updateById(
      confirmationflowId,
      newData
    );
    res.json(updatedConfirmationFlow);
  } catch (error) {
    res.status(500).json({
      message: "Failed to update ConfirmationFlow",
      error: error.message,
    });
  }
};

export const deleteConfirmationFlow = async (req, res) => {
  const confirmationflowId = req.params.id;

  try {
    await confirmationFlowService.deleteById(confirmationflowId);
    res.json({ message: "ConfirmationFlow deleted successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete ConfirmationFlow",
      error: error.message,
    });
  }
};
