const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const connectDB = require("./config/db");
const userRoutes = require("./router/user.route");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

const port = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

app.use(express.json());
app.use("/api/users", userRoutes);

// Socket.IO Logic
const {
  registerUser,
  disconnectUser,
  joinRoom,
  sendPrivateMessage,
  sendRoomMessage,
} = require("./controller/user.controller");

io.on("connection", (socket) => {
  console.log("New User Connected:", socket.id);

  socket.on("register", (username) => {
    console.log(`Register event received for username: ${username}`);
    registerUser(socket, username, io);
  });

  socket.on("join-room", (roomId) => {
    console.log(`Join-room event received for roomId: ${roomId}`);
    joinRoom(socket, roomId, io);
  });

  socket.on("private-message", ({ toUserId, message }) => {
    console.log(
      `Private-message event from ${socket.id} to ${toUserId}: ${message}`
    );
    sendPrivateMessage(socket, toUserId, message);
  });

  socket.on("room-message", ({ roomId, message }) => {
    console.log(`Room-message event for room ${roomId}: ${message}`);
    sendRoomMessage(socket, roomId, message, io);
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected:", socket.id);
    disconnectUser(socket, io);
  });

  socket.on("error", (error) => {
    console.error("Socket error:", error);
  });
});

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
