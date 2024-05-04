import express from "express";
import { 
    registerUser, 
    loginUser, 
    forgotPasswordHandler, 
    resetPasswordHandler,
    currentUser,
    logoutUser
    // verifyEmailHandler
} from "@controllers/authController.js";
import verifyToken from '@middlewares/auth.js';
import { validate } from "@requests/validation.js";
import { loginRequest } from "@requests/auth/loginRequest.js";
import { registerRequest } from "@requests/auth/registerRequest.js";
import { resetPasswordRequest } from "@requests/auth/resetPasswordRequest.js";
import { forgetPasswordRequest } from "@requests/auth/forgetPasswordRequest.js";

const router = express.Router();

// Register routes
router.post('/register', validate(registerRequest), registerUser);
router.post('/login', validate(loginRequest), loginUser);
router.get('/user', verifyToken, currentUser);

// Password reset routes
router.post('/forgot-password', validate(forgetPasswordRequest), forgotPasswordHandler);
router.post('/reset-password', validate(resetPasswordRequest), resetPasswordHandler);
router.post('/logout', verifyToken, logoutUser);

// Email verification route (if applicable)
// router.get('/verify-email', verifyEmailHandler);

export default router;
