import App from "@models/App.js";

import * as orderService from "@services/orderService.js";

export const listAppOrders = async (req, res) => {
  try {
    // Get the user ID from the authenticated user
    const appId = req.app._id;

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
    const { orderExternalId, customer, orderDetails, orderTotal } =
      req.body;

    const appId = req.app._id;

    // Call the createOrder service function
    const order = await orderService.create(
      orderExternalId,
      customer,
      appId,
      orderDetails,
      orderTotal
    );

    res.status(201).json(order);
  } catch (error) {
    // Handle errors
    res
      .status(500)
      .json({ message: "Failed to create App", error: error.message });
  }
};
