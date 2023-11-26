const express = require("express");
const { registerUser } = require("../controllers/userControllers");

const router = express.Router();

// to chain multiple requests we can use .route

// register user
router.route("/").post(registerUser);

// login user
// router.post("/login", loginUser);

module.exports = router;
