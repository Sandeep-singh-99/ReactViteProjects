const mongoose = require("mongoose")

const URI = "mongodb://localhost:27017/todoapp"

const ConnectDB = async () => {
    try {
        await mongoose.connect(URI)
        console.log("Connection successfully to DB");
    } catch (error) {
        console.error("Database connection failed");
        process.exit(0)
    }
}

module.exports = ConnectDB