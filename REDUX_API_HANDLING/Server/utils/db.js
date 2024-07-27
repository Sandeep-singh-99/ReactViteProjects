const mongoose = require("mongoose")

const url = "mongodb://localhost:27017/CURDREDUXAPIHANDLING"

const ConnectDB = async () => {
    try {
        await mongoose.connect(url)
        console.log("Database Connection Successfully");
    } catch (error) {
        process.exit(0)
    }
}

module.exports = ConnectDB