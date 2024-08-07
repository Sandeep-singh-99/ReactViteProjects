const mongoose = require("mongoose")

const URL = "mongodb://localhost:27017/UploadImage"

const ConnectDB = async () => {
    try {
        await mongoose.connect(URL)
        console.log("Connection Successfully")
    } catch (error) {
        process.exit(0)
    }
}

module.exports = ConnectDB