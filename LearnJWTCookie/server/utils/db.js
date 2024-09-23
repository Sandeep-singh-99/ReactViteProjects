const { default: mongoose } = require("mongoose");

const MONGODB_URL = 'mongodb://127.0.0.1:27017/learn-jwt-session';

const ConnectDB = async () => {
    try {
        await mongoose.connect(MONGODB_URL);
        console.log('MongoDB connected');
    } catch (error) {
        process.exit(1);
    }
}

module.exports = ConnectDB