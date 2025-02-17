import mongoose from "mongoose";

const MONGODB_URI = 'mongodb://localhost:27017/nextjs_cloudinary';

const ConnectDB = async () => {
    try {
        await mongoose.connect(MONGODB_URI)
        console.log("Connected to MongoDB");
    } catch (error) {
        console.log("Error connecting to MongoDB", error);
        process.exit(1);
    }
}

export default ConnectDB;