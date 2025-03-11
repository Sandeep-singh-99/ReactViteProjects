import { Server } from "socket.io";
import http from "http";
import express from "express";
import GroupMessage from "../models/group-message.models.js";
import Group from "../models/group.model.js";

// https://chat-app-1-tol6.onrender.com

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"],
  },
});

export function getReceiverSocketID(userId) {
  return userSocketMap[userId];
}

// used to store online users
const userSocketMap = {};

io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;

  if (userId) userSocketMap[userId] = socket.id;

  // io.emit() is used to send event to all connected clients
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("sendGroupMessage", async ({ groupId, senderId, text }) => {
    try {
      const group = await Group.findById(groupId);
      if (!group) return;

      const message = await GroupMessage({ groupId, senderId, text });
      await message.save();

      // Emit message to all members in the group
      io.to(groupId).emit("receiveGroupMessage", message);
    } catch (error) {
      console.error("Error sending group message", error);
    }
  });

  // join group room
  socket.on("joinGroup", async (groupId) => {
    socket.join(groupId)
  })

  // Leave Group Room
  socket.on("leaveGroup", (groupId) => {
    socket.leave(groupId);
  });

  socket.on("disconnect", () => {
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { io, app, server };
