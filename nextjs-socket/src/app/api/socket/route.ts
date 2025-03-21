import { NextRequest } from "next/server";
import { Server } from "socket.io";

let io;

export async function GET(req) {
    const response = new Response("Socket.IO server initialized", { status: 200 });

    if (!req.socket.server.io) {
        const io = new Server(req.socket.server);
        req.socket.server.io = io;

        io.on("connection", (socket) => {
            console.log("Socket connected", socket.id);
            
            socket.on("join", (userId) => {
                socket.join(userId);
                console.log(`${socket.id} joined room ${userId}`);
            })

            socket.on("privateMessage", ({ to , message}) => {
                io.to(to).emit("privateMessage", { from: socket.id, message });
            })

            socket.on("disconnect", () => {
                console.log("Socket disconnected", socket.id);
            })
        })
    } else {
        console.log("Socket.IO server already initialized");
    }

    return response;
}