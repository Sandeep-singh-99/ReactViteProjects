import mongoose from "mongoose";

const MONGODB_URI="mongodb://localhost:27017/CRUDAPP"

const ConnectDB = async () => {
    if (mongoose.connection.readyState === 1) {
        // Already connected
        return;
      }
    try {
        await mongoose.connect(MONGODB_URI)
        console.log("Connection successfully to DB");
    } catch (error) {
        console.log("Database connection failed", error);
    }
}

export default ConnectDB