import Order from "@models/Order.js";
import { sendEmail as sendEmailUtil } from "@utils/email.js";

// Function to replace placeholders in a message
const replacePlaceholders = (message, placeholders, values) => {
  return placeholders.reduce((updatedMessage, placeholder, index) => {
    const value = values[placeholder] !== undefined ? values[placeholder] : "";
    return updatedMessage.replace(`{{${placeholder}}}`, value);
  }, message);
};

// Function to send an email
const sendEmail = async (step, order) => {
  try {
    const populatedOrder = await Order.findById(order._id).populate("customer");
    // Retrieve the customer details
    const customer = populatedOrder.customer;
    if (!customer) {
      throw new Error("Customer not found");
    }

    const recipient = customer.email;
    const { content, placeholders } = step.messageTemplate;
    // Replace placeholders in the content with actual values
    const emailContent = replacePlaceholders(content, placeholders, {
      ...customer.toObject(), // Convert customer object to plain JavaScript object
      ...order.toObject(), // Convert order object to plain JavaScript object
    });

    // Send the email using the utility function
    await sendEmailUtil(recipient, "Order Confirmation", emailContent);

    console.log("Email sent successfully:", emailContent);
  } catch (error) {
    console.error("Error sending email:", error.message);
    throw error; // Propagate the error up
  }
};

// Function to send an SMS
const sendSMS = async (step, order) => {
  // Implement SMS sending logic here
  console.log(`Sending SMS: ${step.messageTemplate.content}`);
  // Example: Use a third-party API to send the SMS
};

// Main function to execute a step in the flow
export const executeStep = async (step, order) => {
  try {
    console.log("executing a step...");
    // Perform actions based on the type of the step (e.g., send a message)
    switch (step.channel) {
      case "email":
        await sendEmail(step, order);
        break;
      case "sms":
        await sendSMS(step, order);
        break;
      // Add cases for other communication channels as needed
      default:
        console.log(`Unsupported channel: ${step.channel}`);
    }
  } catch (error) {
    console.error("Error executing step:", error.message);
    throw error;
  }
};

// Function to simulate asynchronous sleep
export const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
