const express = require('express')
const { createServer } = require('http')
const { Server } = require('socket.io')

const app = express()
const server = createServer(app)
const io = new Server(server, {
    cors: {
        origin: '*',
    }
})

io.on('connection', (socket) => {
    console.log('a user connected');

    // socket.on('chat message', (msg) => {
    //     // console.log("message: " + msg);
    //     io.emit('chat message', msg);
    // })

   socket.emit('hello', 'world Sandeep Singh')
   socket.emit('hello1', 1, '2', { 3: '4', 5:Buffer.from[6]})

   socket.timeout(3000).emit('request', { foo: 'bar' }, 'baz' , (err, response) => {
    if (err) {

    } else {
        console.log(response.status);
    }
   })

    socket.on('disconnect', () => {
        console.log('user disconnected');
    })
})


server.listen(3000, () => {
    console.log(`server is running on http://localhost:3000`);
})
