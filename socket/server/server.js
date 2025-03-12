// const http = require('http');
// const express = require('express');
// const path = require('path');
// const { Server } = require('socket.io');

// const app = express();
// const server = http.createServer(app);
// const io = new Server(server)

// io.on("connection",(socket) => {
//     console.log("New User Connected", socket.id);
//     socket.on("message", (message) => {
//         console.log("a new message", message);
//         io.emit("user-message", message);  
//     })
    
// })

// app.use(express.static(path.resolve("./public")));

// app.get('/', (req, res) => {
//     res.sendFile(path.resolve("./public/index.html"));
// })



// server.listen(5000, () => {
//     console.log('Server is running on http://localhost:5000');
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

const port = 5000


io.on("connection", (socket) => {
    //console.log("New User Connected", socket.id);

    socket.broadcast.emit("welcome", "Welcome to the server Sandeep Singh",socket.id);

    socket.on("message", (message) => {
        console.log("New Message", message);
        io.emit("user-message", message);
    })

    socket.on("disconnect", () => {
        console.log("User Disconnected", socket.id);
    })
})


server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
})