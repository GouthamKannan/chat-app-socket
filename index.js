const express = require("express");
const cors = require('cors');
require("dotenv").config({ path: ".env" });

const ChatController = require('./controller/chat');


// Initialize the express server
const app = express();
app.use(cors({credentials: true, origin: process.env.UI_HOST}));
app.use(express.json());

var http = require('http').createServer(app)
var io = require("socket.io")(http, {
  cors : {
    origin: process.env.UI_HOST,
    methods : ["GET", "POST"]
  }
})

io.on('connection', (socket) => {
  console.log("new client connected")

  socket.on("add_message", async(chat_details) => {
    console.log("Got data")
    console.log("add_message")
    console.log(chat_details)
    const { user_name, group_name, timestamp, message } = chat_details;
    await ChatController.add_chat( user_name, group_name, timestamp, message)
    console.log("added message")

    // Get the chat from the database and update the state variable
    console.log(group_name)
    data = await ChatController.get_chats(group_name);
    console.log(data)
    io.emit("new_message", data)
  })
})

http.listen(process.env.PORT, () => {
  console.log(`socket listing to ${process.env.PORT}`)
})

// API endpoint for testing
app.get("/", (req, res) => {
  return res.json("success");
});