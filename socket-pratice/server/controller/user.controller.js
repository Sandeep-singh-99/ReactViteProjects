const User = require("../models/user.models");
const Room = require("../models/room.models");

const registerUser = async (socket, username, io) => {
  try {
    console.log(`Attempting to register user: ${username}`);
    let user = await User.findOne({ username });
    if (user) {
      console.log(`Username ${username} already taken`);
      socket.emit("error", "Username already taken");
      return;
    }

    user = new User({ username, socketId: socket.id });
    await user.save();
    console.log(`User ${username} saved with ID: ${user._id}`);

    socket.emit("registered", {
      id: user._id,
      username,
      socketId: socket.id,
    });

    const onlineUsers = await User.find().select("_id username");
    io.emit("user-connected", {
      id: user._id,
      username,
    });
    console.log(`Emitted registered and user-connected for ${username}`);
  } catch (error) {
    console.error(`Error registering user ${username}:`, error.message);
    socket.emit("error", "Registration failed");
  }
};

const joinRoom = async (socket, roomId, io) => {
  try {
    const user = await User.findOne({ socketId: socket.id });
    if (!user) return;

    let room = await Room.findOne({ roomId });
    if (!room) {
      room = new Room({ roomId, users: [user._id] });
    } else if (!room.users.includes(user._id)) {
      room.users.push(user._id);
    }
    await room.save();

    socket.join(roomId);
    socket.emit("joined-room", roomId);

    const message = `${user.username} has joined the room`;
    room.messages.push({ sender: user._id, content: message, isSystem: true });
    await room.save();

    io.to(roomId).emit("room-message", {
      system: true,
      message,
    });
  } catch (error) {
    console.error(error);
  }
};

const sendPrivateMessage = async (socket, toUserId, message) => {
  const sender = await User.findOne({ socketId: socket.id });
  const receiver = await User.findById(toUserId);

  if (!sender || !receiver) return;

  socket.to(receiver.socketId).emit("private-message", {
    from: sender._id,
    sender: sender.username,
    message,
  });

  socket.emit("private-message", {
    to: toUserId,
    sender: sender.username,
    receiver: receiver.username,
    message,
  });
};

const sendRoomMessage = async (socket, roomId, message, io) => {
  const user = await User.findOne({ socketId: socket.id });
  const room = await Room.findOne({ roomId });

  if (!user || !room || !room.users.includes(user._id)) return;

  room.messages.push({ sender: user._id, content: message });
  await room.save();

  io.to(roomId).emit("room-message", {
    system: false,
    senderId: user._id,
    sender: user.username,
    message,
  });
};

const disconnectUser = async (socket, io) => {
  try {
    console.log(`Disconnecting user with socket ${socket.id}`);
    const user = await User.findOneAndDelete({ socketId: socket.id });
    if (!user) {
      console.log(`No user found for socket ${socket.id}`);
      return;
    }

    console.log(`User ${user.username} disconnected`);
    const rooms = await Room.find({ users: user._id });
    for (const room of rooms) {
      room.users = room.users.filter(
        (id) => id.toString() !== user._id.toString()
      );
      const message = `${user.username} has left the room`;
      room.messages.push({
        sender: user._id,
        content: message,
        isSystem: true,
      });
      await room.save();
      io.to(room.roomId).emit("room-message", { system: true, message });
      console.log(`Updated room ${room.roomId} for disconnect`);
    }

    io.emit("user-disconnected", {
      id: user._id,
      username: user.username,
    });
  } catch (error) {
    console.error(`Error disconnecting user:`, error.message);
  }
};
module.exports = {
  registerUser,
  joinRoom,
  sendPrivateMessage,
  sendRoomMessage,
  disconnectUser,
};
