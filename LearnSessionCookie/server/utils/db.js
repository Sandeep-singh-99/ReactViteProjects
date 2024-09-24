const { default: mongoose } = require("mongoose")

const ConnectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB)
        console.log("Database connected successfully");
    } catch (error) {
        process.exit(0)
    }
}

module.exports = ConnectDB