const asyncHandler = require("express-async-handler");
const Chat = require("../models/chatModel");
const User = require("../models/userModel");

const accessChat = asyncHandler(async (req, res) => {
  // userId is sent from the frontend - in the request body we will check if the userId exists in the database
  // get chats associated with the userId
  const { userId } = req.body;

  if (!userId) {
    console.log("UserId param not sent with request");
    return res.sendStatus(400);
  }

  // check if chat already exists
  var isChat = await Chat.find({
    // should not be a group chat
    isGroupChat: false,
    $and: [
      // req.user._id is the id of the current user logged in
      { users: { $elemMatch: { $eq: req.user._id } } },
      // userId is the id of the user who is being accessed
      { users: { $elemMatch: { $eq: userId } } },
    ],
    // populate the users field in chatModel without the password
  })
    .populate("users", "-password")
    .populate("latestMessage");

  isChat = await User.populate(isChat, {
    path: "latestMessage.sender",
    select: "name pic email",
  });

  // if chat already exists
  if (isChat.length > 0) {
    res.send(isChat[0]);
  } else {
    var chatData = {
      chatName: "sender",
      isGroupChat: false,
      users: [req.user._id, userId],
    };
  }

  try {
    const createdChat = await Chat.create(chatData);

    const FullChat = await Chat.findOne({ _id: createdChat._id }).populate(
      "users",
      "-password"
    );

    res.status(200).send(FullChat);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

module.exports = { accessChat };
