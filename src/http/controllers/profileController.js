import User from '@models/User.js';
import { updateUserProfile as updateProfileService } from '@services/profileService.js';

export const getUserProfile = async (req, res) => {
    try {
        const userId = req.userId;

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Send user profile data in response
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch user profile', error: error.message });
    }
};

export const updateUserProfile = async (req, res) => {
    try {
        const userId = req.userId;

        const { name, email, city, state, country, occupation, phoneNumber } = req.body;

        // Update user profile
        const updatedUser = await updateProfileService(userId, { name, email, city, state, country, occupation, phoneNumber });

        // Send updated user profile in response
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: 'Failed to update user profile', error: error.message });
    }
};
