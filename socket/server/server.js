// // const http = require('http');
// // const express = require('express');
// // const path = require('path');
// // const { Server } = require('socket.io');

// // const app = express();
// // const server = http.createServer(app);
// // const io = new Server(server)

// // io.on("connection",(socket) => {
// //     console.log("New User Connected", socket.id);
// //     socket.on("message", (message) => {
// //         console.log("a new message", message);
// //         io.emit("user-message", message);  
// //     })
    
// // })

// // app.use(express.static(path.resolve("./public")));

// // app.get('/', (req, res) => {
// //     res.sendFile(path.resolve("./public/index.html"));
// // })



// // server.listen(5000, () => {
// //     console.log('Server is running on http://localhost:5000');
// // })

// const http = require('http');
// const express = require('express');
// const { Server } = require('socket.io');

// const app = express();
// const server = new http.Server(app);

// const io = new Server(server, {
//     cors: {
//         origin: ["http://localhost:5173"]
//     }
// });

// const port = 5000


// io.on("connection", (socket) => {
//     //console.log("New User Connected", socket.id);

//     socket.broadcast.emit("welcome", "Welcome to the server Sandeep Singh",socket.id);

//     socket.on("message", (message) => {
//         console.log("New Message", message);
//         io.emit("user-message", message);
//     })

//     socket.on("disconnect", () => {
//         console.log("User Disconnected", socket.id);
//     })
// })


// server.listen(port, () => {
//     console.log(`Server is running on http://localhost:${port}`);
// })





const http = require('http');
const express = require('express');
const { Server } = require('socket.io');

const app = express();
const server = new http.Server(app);
const io = new Server(server, {
    cors: {
        origin: ["http://localhost:5173"]
    }
});

const port = 5000;

// Store users and rooms
const users = new Map(); // Map to store socket.id -> username
const rooms = new Map(); // Map to store room -> Set of socket.ids

io.on("connection", (socket) => {
    console.log("New User Connected", socket.id);

    // Handle user registration
    socket.on("register", (username) => {
        users.set(socket.id, username);
        socket.emit("registered", {
            id: socket.id,
            username: username,
            onlineUsers: Array.from(users.entries())
        });
        // Notify other users
        socket.broadcast.emit("user-connected", {
            id: socket.id,
            username: username
        });
    });

    // Join a room
    socket.on("join-room", (roomId) => {
        // Leave any existing rooms
        rooms.forEach((usersSet, room) => {
            if (usersSet.has(socket.id)) {
                usersSet.delete(socket.id);
                socket.leave(room);
                io.to(room).emit("room-message", {
                    system: true,
                    message: `${users.get(socket.id)} has left the room`
                });
            }
        });

        // Join new room
        if (!rooms.has(roomId)) {
            rooms.set(roomId, new Set());
        }
        rooms.get(roomId).add(socket.id);
        socket.join(roomId);
        
        socket.emit("joined-room", roomId);
        io.to(roomId).emit("room-message", {
            system: true,
            message: `${users.get(socket.id)} has joined the room`
        });
    });

    // One-to-one message
    socket.on("private-message", ({ toUserId, message }) => {
        const sender = users.get(socket.id);
        const receiver = users.get(toUserId);
        
        // Send to recipient
        socket.to(toUserId).emit("private-message", {
            from: socket.id,
            sender: sender,
            message: message
        });
        
        // Send back to sender for confirmation
        socket.emit("private-message", {
            to: toUserId,
            sender: sender,
            receiver: receiver,
            message: message
        });
    });

    // Room message
    socket.on("room-message", ({ roomId, message }) => {
        const sender = users.get(socket.id);
        io.to(roomId).emit("room-message", {
            system: false,
            senderId: socket.id,
            sender: sender,
            message: message
        });
    });

    // Handle disconnection
    socket.on("disconnect", () => {
        const username = users.get(socket.id);
        
        // Remove from rooms
        rooms.forEach((usersSet, room) => {
            if (usersSet.has(socket.id)) {
                usersSet.delete(socket.id);
                io.to(room).emit("room-message", {
                    system: true,
                    message: `${username} has left the room`
                });
            }
        });

        // Remove user and notify others
        users.delete(socket.id);
        socket.broadcast.emit("user-disconnected", {
            id: socket.id,
            username: username
        });
        
        console.log("User Disconnected", socket.id);
    });
});

server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});