// server/config/db.js
const mongoose = require('mongoose');

const MONGODB_URI = "mongodb://localhost:27017/socket-practice";    

const connectDB = async () => {
    try {
        await mongoose.connect(MONGODB_URI)
        console.log('MongoDB connected...');
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

module.exports = connectDB;
