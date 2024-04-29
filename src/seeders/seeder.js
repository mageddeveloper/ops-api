import mongoose from 'mongoose';
import User from '@models/User.js'; // Assuming your user model imports correctly
import bcrypt from 'bcryptjs'; // Import bcrypt for password hashing
import dotenv from 'dotenv';
import { userSeeder } from './userSeeder.js';

dotenv.config();

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log('Connected to MongoDB');

    // Clear existing data (optional)
    await User.deleteMany({});

    // Hash passwords before inserting users
    const hashedUsers = userSeeder.map(async (user) => {
      user.password = await bcrypt.hash(user.password, 10); // Use a suitable cost factor (e.g., 12) for stronger hashing
      return user;
    });

    // Wait for all password hashing to complete before inserting
    const usersToInsert = await Promise.all(hashedUsers);

    // Insert users with hashed passwords
    await User.insertMany(usersToInsert);
    console.log('Database seeded successfully');

    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  } catch (error) {
    console.error('Error seeding database:', error.message);
  }
};

seedDatabase();
