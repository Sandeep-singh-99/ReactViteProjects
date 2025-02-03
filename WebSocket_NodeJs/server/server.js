const express = require('express')
const http = require('http')
const path = require('path')
const { Server } = require('socket.io')

const app = express()
const server = http.createServer(app)

const io = new Server(server)

// socket.io

io.on('connection', (socket) => {
    console.log('A new user has connected', socket.id);
    socket.on('message', (msg) => {
        console.log("Message: ", msg);
        io.emit('message', msg)
    })
})


app.use(express.static(path.resolve("./public")))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

server.listen(9000, () => {
    console.log(`server is running http://localhost:9000`);
})