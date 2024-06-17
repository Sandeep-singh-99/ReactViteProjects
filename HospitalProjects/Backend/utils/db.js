const mongoose = require('mongoose')

const URI = "mongodb://localhost:27017/HospitalApp"


const ConnectDB = async () => {
    try {
        await mongoose.connect(URI)
        console.log("Connection successfully to DB");
    } catch (err) {
        console.log("Database connection failed");
        process.exit(0)
    }
}

module.exports = ConnectDB