const mongoose = require('mongoose');

const ConnectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("Connection successfully to DB");
    } catch (error) {
        process.exit(0)
    }
}

module.exports = ConnectDB