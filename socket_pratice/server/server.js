const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

app.use(cors({
    origin: '*',
    credentials: true,
}))

mongoose
  .connect("mongodb://localhost:27017/socket_practice")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error in connecting to MongoDB", err));

const userSchema = new mongoose.Schema(
  {
    senderId: {
      type: String,
    },

    receiverId: {
      type: String,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

io.on("connection", (socket) => {
  console.log("a user connected");

  // socket.on('chat message', (msg) => {
  //     // console.log("message: " + msg);
  //     io.emit('chat message', msg);
  // })

  //    socket.emit('hello', 'world Sandeep Singh')
  //    socket.emit('hello1', 1, '2', { 3: '4', 5:Buffer.from[6]})

  //    socket.timeout(3000).emit('request', { foo: 'bar' }, 'baz' , (err, response) => {
  //     if (err) {

  //     } else {
  //         console.log(response.status);
  //     }
  //    })

  socket.on("one-to-one", async (senderId) => {
    try {
        if (!senderId || typeof senderId !== 'string') {
            socket.emit('error', 'Invalid senderId');
            return;
          }
      const user = await User({ senderId, receiverId: senderId });

      await user.save();

      const messageData = {
        senderId,
        receiverId: senderId,
      };
      io.emit("one", messageData );
      console.log("one-to-one event", messageData);
    } catch (error) {
      console.error("Error in one-to-one event", error);
    }
  });

  app.get("/all-messages", async (req, res) => {
    try {
        const allmMessage = await User.find().sort({ createdAt: -1 });

        res.status(200).json(allmMessage)
    } catch (error) {
        console.error("Error in fetching all messages", error);
    }
  })

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });

  socket.on("error", (error) => {
    console.error("Error in socket", error);
  })
});

server.listen(3000, () => {
  console.log(`server is running on http://localhost:3000`);
});
