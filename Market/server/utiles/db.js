const { default: mongoose } = require("mongoose")

const URI = "mongodb://localhost:27017/market"

const ConnectDB = async (req, res) => {
    try {
        await mongoose.connect(URI)
        console.log("Database connected Successfully");
    } catch (error) {
        console.log("Database connection failed");
        process.exit(0)
    }
}

module.exports = ConnectDB