import mongoose from "mongoose";

const MONGODB_URI = "mongodb://localhost:27017/nextjs-imagekit"

if (!MONGODB_URI) {
    throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

let cached = global.mongoose

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null }
}

const uri: string = MONGODB_URI

if (!uri) {
    throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

export async function ConnectDB() {
    if (cached.conn) {
        return cached.conn
    }
    if (mongoose.connections[0].readyState) {
        return; // Already connected
    }
    

    if (!cached.promise) {
        const opts = {
            bufferCommands: false,
            maxPoolSize: 10,
        }

        cached.promise = mongoose.connect(uri, opts).then((mongoose) => mongoose.connection)
    }

    try {
        cached.conn = await cached.promise
        console.log('Connected to MongoDB');
        
    } catch (error) {
        cached.promise = null
        throw error
    }

    return cached.conn
}