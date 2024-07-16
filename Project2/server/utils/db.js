const mongoose = require("mongoose")

const ConnectDB = async () => {
    try {
        await mongoose.connect(process.env.URL)
        console.log("Connection Successfully");
    } catch (error) {
        process.exit(0)
    }
}

module.exports = ConnectDB