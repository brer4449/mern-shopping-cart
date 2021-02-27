const express = require("express");
const router = express.Router();
const { authUser, getUserProfile } = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

router.post("/login", authUser);
// to implement middleware, put it as first argument
router.route("/profile").get(protect, getUserProfile);

module.exports = router;
