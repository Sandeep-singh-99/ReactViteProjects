require('dotenv').config();
const express = require('express')
const app = express()
const PORT = 5000
const cors = require('cors')
const ConnectDB = require('./utils/db')

const imageRouter = require('./router/image-router')

app.use(cors())
app.use(express.json())

app.use('/api', imageRouter)

ConnectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port http://localhost:${PORT}`);
    })
}).catch((err) => {
    console.log("Database connection failed", err);
})
