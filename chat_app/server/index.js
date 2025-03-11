import express from 'express';
import ConnectDB from './lib/db.js';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
dotenv.config();
import authRouter from './routes/auth.routes.js';
import messageRouter from './routes/message.routes.js';
import groupMessageRouter from './routes/groupMessage.routes.js'
import group from './routes/group.routes.js'
import { app, server } from './lib/socket.js';

import path from 'path';

const PORT = process.env.PORT || 5000;

const _dirname = path.resolve()


// app.use(express.json());
app.use(express.json({ limit: "50mb" }));  
app.use(express.urlencoded({ limit: "50mb", extended: true }));  

app.use(cookieParser());

app.use(cors({
    origin: "http://localhost:5173",  
    credentials: true,       
}));

app.use("/api/auth", authRouter);
app.use("/api/messages", messageRouter);
app.use("/api/group-messages", groupMessageRouter)
app.use("/api/group", group)

// if (process.env.NODE_ENV === 'production') {
//     app.use(express.static(path.join( _dirname, '../client/build')))

//     app.get('*', (req, res) => {
//         res.sendFile(path.join(_dirname, "../client", "build", "index.html"))
//     })
// }

ConnectDB().then(() => {
    server.listen(PORT, () => {
        console.log(`Server running on port http://localhost:${PORT}`);
    });
})