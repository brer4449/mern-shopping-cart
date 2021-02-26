const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");

// @desc Authenticate user & get token
// @route POST /api/users/login
// @access Public
const authUser = asyncHandler(async (req, res) => {
  // req.body is the data in postman (in this case email and password) can access this data from req.body
  const { email, password } = req.body;

  // email: email === email
  const user = await User.findOne({ email });
  // if user exists and passwords match
  // this password is the plain text one that we're comparing to encrypted password
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: null,
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

module.exports = {
  authUser,
};
