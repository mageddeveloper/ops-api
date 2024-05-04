import * as authService from '@services/auth.js';

export const currentUser = async (req, res) => {
  try {
    // Retrieve the current user from the request object (set by the authentication middleware)
    const currentUser = req.user;

    // Return the current user in the response
    res.status(200).json({user: currentUser});
  } catch (error) {
    // Handle errors
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const registerUser = async (req, res) => {
  try {
    const user = await authService.register(req.body);
    res.status(201).json(user); 
  } catch (error) {
    res.status(400).json({ message: error.message }); 
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { token, user } = await authService.login(email, password);
    res.json({ token, user }); 
  } catch (error) {
    // Check if the error message is related to email or password
    let errors = {};
    if (error.message === 'Invalid email address') {
      errors.email = 'Email address not found';
    } else if (error.message === 'Invalid password') {
      errors.password = 'Incorrect password';
    }
    res.status(401).json({ errors }); 
  }
};

export const forgotPasswordHandler = async (req, res) => {
  try {
    const { email } = req.body;
    await authService.forgotPassword(email);
    res.status(200).json({ message: 'Password reset instructions sent to your email' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const resetPasswordHandler = async (req, res) => {
  try {
    const { token, password } = req.body;
    await authService.resetPassword(token, password);
    res.status(200).json({ message: 'Password reset successfully!' }); 
  } catch (error) {
    res.status(400).json({ message: error.message }); 
  }
};



// Controller function to handle user logout
export const logoutUser = async (req, res) => {
  try {
    // Perform logout action (e.g., clear user session or token)
    // For example, if using token-based authentication with JWT, you may invalidate the token.
    // You can also clear any user-related data stored in the session or cookies.

    // For illustration purposes, let's assume we're invalidating the token
    // (e.g., by removing it from the database of valid tokens, or marking it as expired)

    // Here, you would perform any necessary logout actions (e.g., invalidate token, clear session data)
    // After performing the logout action, send a response indicating successful logout

    res.status(200).json({ message: 'Logout successful' });
  } catch (error) {
    // Handle errors
    res.status(500).json({ error: 'Internal server error' });
  }
};
