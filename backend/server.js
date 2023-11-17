const express = require("express");
const dotenv = require("dotenv");
const { chats } = require("./data/data");

// configurations
const app = express();
dotenv.config();

// routes
app.get("/", (req, res) => {
  res.send("API is up and running");
});

// for all chats
app.get("/api/chat", (req, res) => {
  res.send(chats);
});

// for specific chat
app.get("/api/chat/:id", (req, res) => {
  //   console.log(req.params.id);
  const singleChat = chats.find((c) => c._id === req.params.id);
  res.send(singleChat);
});

// getting the PORT
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
