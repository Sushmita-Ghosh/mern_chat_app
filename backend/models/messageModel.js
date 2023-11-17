const moongoose = require("mongoose");

const messageModel = new moongoose.Schema(
  {
    sender: {
      type: moongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    content: {
      type: String,
      trim: true,
    },
    chat: {
      type: moongoose.Schema.Types.ObjectId,
      ref: "Chat",
    },
  },
  { timestamps: true }
);

const Message = moongoose.model("Message", messageModel);

module.exports = Message;
