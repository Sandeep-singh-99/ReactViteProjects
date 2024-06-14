const mongoose = require('mongoose')

const URI = "mongodb://localhost:27017/notemaker"

const ConnectDB = async () => {
    try {
        await mongoose.connect(URI)
        console.log("Connection successfully to DB");
    } catch (error) {
        console.log("Database Connection failed");
        process.exit(0)
    }
}

module.exports = ConnectDB