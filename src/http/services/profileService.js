import User from '@models/User.js';

// Service function to update user profile
export const updateUserProfile = async (userId, newData) => {
    try {
        // Find user by ID and update profile data
        const updatedUser = await User.findByIdAndUpdate(userId, newData, { new: true });

        if (!updatedUser) {
            throw new Error('User not found');
        }

        return updatedUser;
    } catch (error) {
        throw new Error('Failed to update user profile');
    }
};

// Service function to update user profile
export const updateProfileService = async (userId, newData) => {
    try {
        // Find user by ID and update profile data
        const updatedUser = await User.findByIdAndUpdate(userId, newData, { new: true });

        if (!updatedUser) {
            throw new Error('User not found');
        }

        return updatedUser;
    } catch (error) {
        throw new Error('Failed to update user profile');
    }
};
