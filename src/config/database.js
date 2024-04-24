import mongoose from 'mongoose';

// Import environment variables
import config from './environment.js';

const connectDB = async () => {
  try {
    await mongoose.connect(config.mongoURI);
    console.log('MongoDB database connection established successfully');
  } catch (error) {
    console.error('Error connecting to MongoDB database:', error);
  }
};

export default connectDB;
