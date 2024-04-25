import { body } from "express-validator";

export const orderRequest = [
  // Validate orderExternalId
  body("orderId").notEmpty().withMessage("Order ID is required"),

  // Validate customer details
  body("customer.name").notEmpty().withMessage("Customer name is required"),
  body("customer.email").isEmail().withMessage("Invalid email address"),
  body("customer.phoneNumber")
    .notEmpty()
    .withMessage("Phone number is required")
    .isMobilePhone()
    .withMessage("Invalid phone number"),

  // Validate order details
  // body("orderDetails")
  //   .notEmpty()
  //   .withMessage("Order details are required")
  //   .isObject()
  //   .withMessage("Order details must be an object"),
  // body("orderDetails.products")
  //   .isArray()
  //   .withMessage("Products must be provided")
  //   .isArray({ min: 1 })
  //   .withMessage("At least one product must be provided"),

  // Validate orderTotal
  body("orderTotal")
    .optional()
    .isNumeric()
    .withMessage("Order total must be a number"),
];
