const express = require("express");
const {
  registerUser,
  authUser,
  getAllUsers,
} = require("../controllers/userControllers");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// to chain multiple requests we can use .route
// or else we can use .get, .post

// register user
router.route("/").post(registerUser).get(protect, getAllUsers);

// login user
router.post("/login", authUser);

module.exports = router;
