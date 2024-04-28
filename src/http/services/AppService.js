import App from "@models/App.js";

export const list = async (userId, filters) => {
  try {
    // Construct query to find apps associated with the user ID
    const query = { userId };

    // Apply additional filters to the query
    if (filters) {
      // Implement logic to apply filters to the query
      // For example, filter by appName
      if (filters.appName) {
        query.appName = filters.appName;
      }
      // Add more filters as needed
    }

    // Retrieve apps from the database based on the user ID and additional filters
    const appList = await App.find(query);

    return appList;
  } catch (error) {
    // Handle errors
    throw new Error("Failed to fetch user apps");
  }
};

export const create = async (data, userId) => {
  try {
    // Create a new App instance with the provided data
    const { appName } = data;

    // Create a new app
    const newApp = new App({
      appName,
      userId,
    });

    // Save the new App instance to the database
    await newApp.save();

    return newApp;
  } catch (error) {
    // Handle errors
    throw new Error("Failed to create App: " + error);
  }
};

export const getById = async (id) => {
  try {
    // Retrieve a App by its ID from the database
    const app = await App.findById(id).populate('activeConfirmationFlow');

    return app;
  } catch (error) {
    // Handle errors
    throw new Error("Failed to fetch App by ID");
  }
};

export const updateById = async (id, newData) => {
  try {
    const { appName, environment } = newData
    // Update the App with the provided ID using the new data
    const updatedApp = await App.findByIdAndUpdate(id, { appName, environment }, { new: true });

    return updatedApp;
  } catch (error) {
    // Handle errors
    throw new Error("Failed to update App");
  }
};

export const deleteById = async (id) => {
  try {
    // Delete the App with the provided ID from the database
    await App.findByIdAndDelete(id);

    // Return a success message or any desired response
    return { message: "App deleted successfully" };
  } catch (error) {
    // Handle errors
    throw new Error("Failed to delete App");
  }
};
