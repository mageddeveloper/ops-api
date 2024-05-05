import App from "@models/App.js";
import ConfirmationFlow from "@models/ConfirmationFlow.js";

import * as appService from "@services/appService.js";
import User from "@models/User.js";
import { userResource } from '@resources/userResource.js';

export const listUserApps = async (req, res) => {
  try {
    // Get the user ID from the authenticated user
    const userId = req.user._id;

    // Extract additional filters from the query parameters
    const filters = req.query;

    // Call the service function to retrieve the user's apps with filters
    const apps = await appService.list(userId, filters);

    // Return the list of apps in the response
    res.status(200).json({data: apps});
  } catch (error) {
    // Handle errors
    res
      .status(500)
      .json({ message: "Failed to fetch user apps", error: error.message });
  }
};

export const createApp = async (req, res) => {
  try {
    const app = await appService.create(req.body, req.user._id);

    res.status(201).json(app);
  } catch (error) {
    // Handle errors
    res
      .status(500)
      .json({ message: "Failed to create App", error: error.message });
  }
};

export const getApp = async (req, res) => {
  const appId = req.params.id;

  try {
    const app = await appService.getById(appId);
    if (!app) {
      return res.status(404).json({ message: "App not found" });
    }
    res.json(app);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch App", error: error.message });
  }
};

export const updateApp = async (req, res) => {
  const appId = req.params.id;
  const newData = req.body;

  try {
    const updatedApp = await appService.updateById(appId, newData);
    res.json({data: updatedApp});
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update App", error: error.message });
  }
};

export const deleteApp = async (req, res) => {
  const appId = req.params.id;

  try {
    await appService.deleteById(appId);
    res.json({ message: "App deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete App", error: error.message });
  }
};

export const setConfirmationFlow = async (req, res) => {
  try {
    const { appId, confirmationFlowId } = req.body;

    // Check if the provided app ID exists
    const app = await App.findById(appId);
    if (!app) {
      return res.status(404).json({ message: "App not found" });
    }

    // Check if the provided confirmation flow ID exists
    const confirmationFlow = await ConfirmationFlow.findById(
      confirmationFlowId
    );
    if (!confirmationFlow) {
      return res.status(404).json({ message: "Confirmation flow not found" });
    }

    // Update the activeConfirmationFlow field of the app
    app.activeConfirmationFlow = confirmationFlowId;
    await app.save();

    return res
      .status(200)
      .json({ message: "Active confirmation flow set successfully" });
  } catch (error) {
    console.error("Error setting active confirmation flow:", error);
    return res
      .status(500)
      .json({ message: "Failed to set active confirmation flow" });
  }
};


export const setCurrentApp = async (req, res) => {
  try {
    const { appId } = req.body;

    // Check if the provided app ID exists
    const app = await App.findById(appId);
    if (!app) {
      return res.status(404).json({ message: "App not found" });
    }

    const currentUser = req.user;

    // Find the user document by its ID
    const user = await User.findById(currentUser._id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Set the currentApp field to the appId value
    user.currentApp = appId;

    // Save the updated user document
    await user.save();

    return res.status(200).json({ message: "Current app set successfully", data: userResource(user) });
  } catch (error) {
    console.error("Error setting current app:", error);
    return res
      .status(500)
      .json({ message: "Failed to set current app" });
  }
};
