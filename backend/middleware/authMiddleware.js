const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const userModel = require("../models/userModel");
const User = require("../models/userModel");

const protect = asyncHandler(async (req, res, next) => {
  let token;
  // getting the bearer token we set in Postman via req.headers.authorization (authorization is what we called it)
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // split at space, so will turn bearer into index 0 and token into index 1
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // don't want the password so we're subtracting that
      // will have access to this req.user in all of our protected routes
      req.user = await User.findById(decoded.id).select("-password");
      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      // if this fails it means that token has failed
      throw new Error("Not authorized, token failed");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not Authorized, no token");
  }
});

module.exports = { protect };
