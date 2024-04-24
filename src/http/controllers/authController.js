import * as authService from '@services/auth.js';

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