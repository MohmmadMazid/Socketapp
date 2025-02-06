const express = require("express");
const path = require("path");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const port = 3000;
const io = new Server(server);

app.use(express.static(path.join(__dirname, "public")));

app.get("/chat", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

io.on("connection", (socket) => {
  console.log("user online");

  // Listen for messages from the client
  socket.on("chat message", (msg) => {
    console.log("Message: " + msg);
    // Broadcast the message to all connected clients
    io.emit("chat message", msg);
  });

  // Handle user disconnect
  socket.on("disconnect", () => {
    console.log("user offline");
  });
});

server.listen(port, () => {
  console.log(`Server is working on port ${port}`);
});
