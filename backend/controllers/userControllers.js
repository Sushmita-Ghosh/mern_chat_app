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

//get all users
// /api/user?search=raha
const getAllUsers = asyncHandler(async (req, res) => {
  const keyword = req.query.search
    ? {
        //logical or if either name or email contains the search query in it true // case insensitive(i)
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};

  // find all users except the current user in the database { _id: { $ne: req.user._id } } --> not equal (ne)
  // we need to authorise user for { _id: { $ne: req.user._id } } see -> authMiddleware file
  const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
  res.send(users);
});

module.exports = {
  registerUser,
  authUser,
  getAllUsers,
};
