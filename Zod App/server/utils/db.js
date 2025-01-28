const mongoose = require('mongoose');

const MONGODB_URI = 'mongodb://localhost:27017/zodapp';

const ConnectDB = async () => {
    try {
        await mongoose.connect(MONGODB_URI)
        console.log("Database connected successfully");
    } catch (error) {
        process.exit(1);
        console.log("Database connection failed");
    }
}

module.exports = ConnectDB;