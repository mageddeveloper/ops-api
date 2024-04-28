import App from "@models/App.js";
import Order from "@models/Order.js";
import Customer from "@models/Customer.js";

export const list = async (appId, filters) => {
  try {
    // Construct query to find apps associated with the user ID
    const query = { appId };

    // Apply additional filters to the query
    if (filters) {
      // Implement logic to apply filters to the query
      // For example, filter by appName
      // Add more filters as needed
    }

    // Retrieve apps from the database based on the user ID and additional filters
    const orderList = await Order.find(query);

    return orderList;
  } catch (error) {
    // Handle errors
    throw new Error("Failed to fetch user apps");
  }
};

export const create = async (
  orderId,
  customer,
  appId,
  orderDetails,
  orderTotal
) => {
  try {
    let app = await App.findById(appId);
    // Check if the customer already exists based on email or phone number
    let existingCustomer = await Customer.findOne({
      $or: [{ email: customer.email }, { phoneNumber: customer.phoneNumber }],
    });

    // If the customer does not exist, create a new customer record
    if (!existingCustomer) {
      existingCustomer = await Customer.create({
        name: customer.name,
        email: customer.email,
        phoneNumber: customer.phoneNumber,
        appId: appId,
      });
    }

    // Create a new order instance
    const order = new Order({
      orderId,
      customer: existingCustomer,
      app,
      orderDetails,
      orderTotal,
    });

    // Save the order to the database
    await order.save();

    return order;
  } catch (error) {
    // Handle errors
    console.error("Failed to create order:", error);
    throw new Error("Failed to create order");
  }
};

export const findByOrderIdAndAppId = async (orderId, appId) => {
  try {
    // Query the database for an order with the given orderId and appId
    const order = await Order.findOne({
      orderId: orderId,
      appId: appId,
    });

    return order;
  } catch (error) {
    // Handle errors
    throw new Error(
      "Failed to find order by orderId and appId: " + error.message
    );
  }
};
