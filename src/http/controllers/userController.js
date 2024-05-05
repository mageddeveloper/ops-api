import User from "@models/User.js";
import * as userService from '@services/UserService.js';

export const getUsers = async (req, res) => {
  try {
    const customers = await User.find({ role: "user" }).select("-password");
    res.status(200).json(customers);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const setUserTimezone = async (req, res) => {
  try {
    const { timezone } = req.body;

    const currentUser = req.user;

    // Find the user document by its ID
    const user = await User.findById(currentUser._id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Set the timezone field to the provided timezone value
    user.timezone = timezone;

    // Save the updated user document
    await user.save();

    return res.status(200).json({ message: "Timezone set successfully" });
  } catch (error) {
    console.error("Error setting timezone:", error);
    return res.status(500).json({ message: "Failed to set timezone" });
  }
};

