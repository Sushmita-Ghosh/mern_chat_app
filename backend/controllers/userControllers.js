// These all are the controllers for the user
// functionalities - register, login, logout

const asyncHandler = require("express-async-handler"); // to handle async errors
const generateToken = require("../config/generateToken");
const User = require("../models/userModel");

//  we will use express-async-handler to handle async errors
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, pic } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please Enter all the Feilds");
  }

  // check if user exists
  // querying the database for specific user with the email
  const userExists = await User.findOne({ email });

  // if user exists throw error as we can't register , needs to login
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  // if not, create a new user'
  const user = await User.create({
    name,
    email,
    password,
    pic,
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      pic: user.pic,
      //   we are generating a JWT token when we send the user back to the frontend
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Failed to Create the User");
  }
});

// login the user
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // check if user exists
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.status(200).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid Email or Password");
  }
});

module.exports = {
  registerUser,
  authUser,
};
