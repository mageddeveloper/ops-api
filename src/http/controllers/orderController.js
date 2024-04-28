import Order from "@models/Order.js";
import * as orderService from "@services/orderService.js";
import { executeConfirmationFlow } from "@controllers/confirmationFlowController.js";

export const listAppOrders = async (req, res) => {
  try {
    // Get the user ID from the authenticated user
    const appId = req.body.appId;

    // Extract additional filters from the query parameters
    const filters = req.query;

    // Call the service function to retrieve the user's apps with filters
    const orders = await orderService.list(appId, filters);

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

    // Execute the confirmation flow for the created order
    await executeConfirmationFlow(order._id);

    res.status(201).json(order);
  } catch (error) {
    // Handle errors
    console.error("Failed to create order:", error);
    res
      .status(500)
      .json({ message: "Failed to create order", error: error.message });
  }
};
