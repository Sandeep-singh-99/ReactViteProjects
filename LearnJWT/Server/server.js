const express = require('express')
const app = express()
const cors = require('cors')
const ConnectDB = require('./utils/db')
const PORT = 5000
const JWTRouter = require('./router/learn-router')

// middleware
app.use(cors())
app.use(express.json())

app.use('/api', JWTRouter)

ConnectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`server is running http://localhost:${PORT}`);
    })
})

