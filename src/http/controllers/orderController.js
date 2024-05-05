import App from "@models/App.js";
import Order from "@models/Order.js";
import FlowStep from "@models/FlowStep.js";
import ConfirmationFlow from "@models/ConfirmationFlow.js";
import * as orderService from "@services/orderService.js";
import ConfirmationFlowStep from "@models/ConfirmationFlowStep.js";

export const listAppOrders = async (req, res) => {

  try {
    // Get the user ID from the authenticated user
    const app = req.body.appId;

    // Extract additional filters from the query parameters
    const filters = req.query;

    // Call the service function to retrieve the user's apps with filters
    const orders = await orderService.list(app, filters);

    // Return the list of apps in the response
    res.status(200).json(orders);
  } catch (error) {
    // Handle errors
    res
      .status(500)
      .json({ message: "Failed to fetch app orders", error: error.message });
  }
};

export const createOrder = async (req, res) => {
  try {
    // Extract necessary data from the request body
    const { orderId, customer, orderDetails, orderTotal } = req.body;

    const appId = req.customApp._id;

    // Check if an order with the same orderId and appId already exists
    const existingOrder = await Order.findOne({ orderId, app: appId });

    if (existingOrder) {
      return res.status(400).json({
        message:
          "Order with the same order Id already exists for this application",
      });
    }

    const order = await orderService.create(
      orderId,
      customer,
      appId,
      orderDetails,
      orderTotal
    );

    // Retrieve the active confirmation flow for the app
    const app = await App.findById(appId);
    const activeConfirmationFlow = await ConfirmationFlow.findById(
      app.activeConfirmationFlow
    );

    if (!activeConfirmationFlow) {
      throw new Error("No active confirmation flow found for the app");
    }

    // Retrieve flow steps for the active confirmation flow
    const flowSteps = await FlowStep.find({
      confirmationFlow: activeConfirmationFlow._id,
    }).sort({ order: 1 });

    // Calculate execution dates for each step
    let executionDate = new Date();
    for (const step of flowSteps) {
      executionDate = new Date(executionDate.getTime() + step.interval * 1000);

      // Create a confirmation flow step document for the order
      const confirmationFlowStep = new ConfirmationFlowStep({
        order: order._id,
        step: step._id,
        executionDate,
        status: "pending",
      });

      // Save the confirmation flow step document to the database
      await confirmationFlowStep.save();
    }

    res.status(201).json(order);
  } catch (error) {
    // Handle errors
    console.error("Failed to create order:", error);
    res
      .status(500)
      .json({ message: "Failed to create order", error: error.message });
  }
};
