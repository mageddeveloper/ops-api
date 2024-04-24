import dotenv from 'dotenv'
dotenv.config()

export default {
    port: process.env.PORT || 9000,
    mongoURI: process.env.MONGO_URL,
    frontendUrl: process.env.FRONTEND_URL || 'http://localhost:3000',
};