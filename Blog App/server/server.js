require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const PORT = process.env.PORT
const ConnectDB = require('./utils/db')
const authRouter = require("./router/auth-router")


app.use(cors())
app.use(express.json())

app.use("/api/auth", authRouter)

ConnectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`server is running http://localhost:${PORT}`);
    })
})
