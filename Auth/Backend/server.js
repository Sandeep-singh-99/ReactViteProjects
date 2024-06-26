require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const PORT = process.env.PORT || 3000
const ConnectDB = require('./utils/db')
const authrouter = require("./router/auth-router")


app.use(cors())
app.use(express.json())

app.use("/api/auth", authrouter)

ConnectDB().then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`server is running http://localhost:${PORT}`);
    })
})
