import App from "@models/App.js";
import Order from "@models/Order.js";
import FlowStep from "@models/FlowStep.js";
import ConfirmationFlow from "@models/ConfirmationFlow.js";

import * as confirmationFlowService from "@services/confirmationFlowService.js";
import * as executeFlowService from "@services/executeFlowService.js";

export const listConfirmationFlows = async (req, res) => {
  try {
    // Get the user ID from the authenticated user
    const appId = req.body.appId;

    // Extract additional filters from the query parameters
    const filters = req.query;

    // Call the service function to retrieve ConfirmationFlows with filters
    const ConfirmationFlows = await confirmationFlowService.list(
      appId,
      filters
    );

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
    const confirmationflow = await confirmationFlowService.create(
      dataWithCreatedBy
    );

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

// Function to execute confirmation flow steps
// export const executeConfirmationFlow = async (orderId) => {
//   try {
//     // Retrieve the order by its ID
//     const order = await Order.findById(orderId);

//     if (!order) {
//       throw new Error("Order not found");
//     }

//     // Retrieve the app ID from the order
//     const appId = order.app;

//     // Retrieve the app
//     const app = await App.findById(appId);

//     if (!app) {
//       throw new Error("App not found");
//     }

//     // Retrieve the active confirmation flow for the app
//     const activeConfirmationFlow = await ConfirmationFlow.findById(
//       app.activeConfirmationFlow
//     );

//     if (!activeConfirmationFlow) {
//       throw new Error("No active confirmation flow found for the app");
//     }

//     // Retrieve flow steps for the active confirmation flow
//     const flowSteps = await FlowStep.find({
//       confirmationFlow: activeConfirmationFlow._id,
//     })
//       .sort({ order: 1 })
//       .populate("messageTemplate");

//     // Execute flow steps sequentially
//     for (const step of flowSteps) {
//       await executeFlowService.executeStep(step, order);
//       await confirmationFlowQueue.add("executeStep", { step, orderId });
//       await executeFlowService.sleep(step.interval * 1000);
//     }

//     console.log("Confirmation flow executed successfully");
//   } catch (error) {
//     console.error("Error executing confirmation flow:", error.message);
//   }
// };
