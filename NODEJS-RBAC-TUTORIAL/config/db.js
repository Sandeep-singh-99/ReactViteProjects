const { default: mongoose } = require("mongoose");

const ConnectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("MongoDB connected");
    } catch (error) {
        console.log("Error connecting to database: ", error);
        process.exit(1);
    }
}

module.exports = ConnectDB;