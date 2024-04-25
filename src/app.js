import path from "path";
import i18n from "i18n";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import express from "express";
import bodyParser from "body-parser";
import authRoutes from "@routes/Auth.js";
import userRoutes from "@routes/User.js";
import appRoutes from "@routes/App.js";
import config from "@config/environment.js";
import connectDB from "@config/database.js";
import profileRoutes from "@routes/Profile.js";
import orderRoutes from "@routes/Order.js";
import adminRoutes from "@routes/Admin.js";
import errorHandler from "@middlewares/errorHandler.js";
import confirmationRoutes from "@routes/ConfirmationFlow.js";

const app = express();

// Set up i18n configuration
// i18n.configure({
//   locales: ["en", "ar"], // Supported languages
//   directory: path.join(new URL(import.meta.url).pathname, "../locales"),
//   defaultLocale: "ar", // Default language
//   queryParameter: "lang", // Query parameter to switch languages (e.g., ?lang=ar)
// });

// Use i18n middleware
// app.use(i18n.init);
app.set("trust proxy", true);

// Common Middleware
app.use(bodyParser.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(cors());
app.set("trust proxy", true);
// Routes
app.use("/users", userRoutes);
app.use("/app", appRoutes);
app.use("/auth", authRoutes);
app.use("/profile", profileRoutes);
app.use("/order", orderRoutes);
app.use("/confirmation", confirmationRoutes);

// Admin routess
app.use("/admin", adminRoutes);

// Error Handling Middleware
app.use(errorHandler);

// Database Connection
connectDB()
  .then(() => {
    app.listen(config.port, () => console.log(`Server Port: ${config.port}`));
  })
  .catch((error) => console.log(error));
