import dotenv from 'dotenv'

dotenv.config()

export default (err, req, res, next) => {
  // Log the error to the console
  console.error(err.stack);

  // Determine the appropriate HTTP status code
  const statusCode = err.statusCode || 500;

  // Format the error response
  const response = {
    message: err.message,
  };

  // If running in development mode, include the error stack for debugging
  if (process.env.NODE_ENV === 'development') {
    response.stack = err.stack;
  }

  // Send the error response
  res.status(statusCode).json(response);
};
  