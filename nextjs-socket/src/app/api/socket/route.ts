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

            
        })
    }
}