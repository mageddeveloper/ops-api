import dotenv from 'dotenv'
dotenv.config()

export default {
    port: process.env.PORT || 8000,
    mongoURI: process.env.MONGO_URL,
    frontendUrl: process.env.FRONTEND_URL || 'http://localhost:3000',
    twilio_test_sid: process.env.TWILIO_TEST_SID,
    twilio_test_token: process.env.TWILIO_TEST_TOKEN,

    twilio_live_sid: process.env.TWILIO_LIVE_SID,
    twilio_live_token: process.env.TWILIO_LIVE_TOKEN,
    twilio_sandbox_number: process.env.TWILIO_SANDBOX_NUMBER,
};