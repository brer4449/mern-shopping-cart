// Custom error handling middleware
const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

// to overwrite default error handling, pass in error first in the middleware function
const errorHandler = (err, req, res, next) => {
  // set the error to the status code, if it's 200 change it 500 otherwise return the status code
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: err.message,
    // want the stack but only if we're not in production
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

module.exports = { notFound, errorHandler };
