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
  