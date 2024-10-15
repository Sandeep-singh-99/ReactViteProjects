const { default: mongoose } = require("mongoose");

const MONGODB = "mongodb://localhost:27017/cloudinary";

const ConnectDB = async () => {
    try {
        await mongoose.connect(MONGODB)
        console.log("MongoDB connected")
    } catch (error) {
        process.exit(0)
    }
}

module.exports = ConnectDB