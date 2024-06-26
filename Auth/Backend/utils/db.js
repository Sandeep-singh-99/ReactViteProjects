const mongoose = require('mongoose')

const ConnectDB = async () => {
    try {
        await mongoose.connect(process.env.URI)
        console.log("Connection successfully to DB");
    } catch (error) {
        console.log("Database connection failed");
        process.exit(0)
    }
}

module.exports = ConnectDB