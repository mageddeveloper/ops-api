import App from "@models/App.js";

import * as appService from "@services/appService.js";

export const listUserApps = async (req, res) => {
  try {
    // Get the user ID from the authenticated user
    const userId = req.user._id;

    // Extract additional filters from the query parameters
    const filters = req.query;

    // Call the service function to retrieve the user's apps with filters
    const apps = await appService.list(userId, filters);

    // Return the list of apps in the response
    res.status(200).json(apps);
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
    res.json(updatedApp);
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
