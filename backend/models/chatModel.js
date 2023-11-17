//  we are creating a schema for a single chat
const mongoose = require("mongoose");

const chatModel = new mongoose.Schema(
  {
    chatName: {
      type: String,
      trim: true,
    },
    isGroupChat: {
      type: Boolean,
      default: false,
    },
    users: [
      {
        type: mongoose.Schema.Types.ObjectId, // the id of the user
        ref: "User",
      },
    ],
    latestMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message", // the messsage model
    },
    groupAdmin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // the user model
    },
  },
  {
    timestamps: true,
  }
);

const Chat = mongoose.model("Chat", chatModel);

module.exports = Chat;
