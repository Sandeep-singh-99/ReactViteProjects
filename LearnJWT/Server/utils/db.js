const { default: mongoose } = require("mongoose")

const MONGODB_URL = 'mongodb://localhost:27017/LEARNJWT'        

const ConnectDB = async () => {
    try {
        await mongoose.connect(MONGODB_URL)
        console.log('Connection Successfully')
    } catch (error) {
        process.exit(0)
    }
}

module.exports = ConnectDB