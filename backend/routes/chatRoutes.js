const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const {
  accessChat,
  fetchChats,
  createGroupChat,
  renameGroup,
} = require("../controllers/chatController");

const router = express.Router();

// protect will help us check if the user is authenticated/ logged in or not before accessing the route
router.route("/").post(protect, accessChat);

//fetching chats for a user
router.route("/").get(protect, fetchChats);

//creating group chat
router.route("/group").post(protect, createGroupChat);

//to rename group
router.route("/rename").put(protect, renameGroup);

// to remove user from group
// router.route("/groupremove").put(protect, removeFromGroup);

// to add user to group
// router.route("/groupadd").put(protect, addToGroup);

module.exports = router;
