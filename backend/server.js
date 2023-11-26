const express = require("express");
const dotenv = require("dotenv");
const { chats } = require("./data/data");
const connectDB = require("./config/db");
const colors = require("colors");
const userRoutes = require("./routes/userRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

// configurations
const app = express();
dotenv.config();
connectDB();

// to accept json data
app.use(express.json());

// routes
app.get("/", (req, res) => {
  res.send("API is up and running");
});

// routes
app.use("/api/user", userRoutes);

// error handler
app.use(notFound);
app.use(errorHandler);

// getting the PORT
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`.yellow.bold);
});

// ------------------------------------------*****************TESTING ROUTES*****************-----------------------------------------------------------------------------------------------------------------------
// The below two were for testing
// for all chats
// app.get("/api/chat", (req, res) => {
//   res.send(chats);
// });

// for specific chat
// app.get("/api/chat/:id", (req, res) => {
//   //   console.log(req.params.id);
//   const singleChat = chats.find((c) => c._id === req.params.id);
//   res.send(singleChat);
// });
