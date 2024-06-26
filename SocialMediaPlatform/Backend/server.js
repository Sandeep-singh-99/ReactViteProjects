require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const path = require('path')
const fs = require('fs')
const helmet = require('helmet')
const ConnectDB = require('./utils/db')
const postRouter = require('./router/social-router')

app.use(express.json())
app.use(cors())
app.use(helmet())


app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, 'uploads')
if(!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir)
}

app.use('/api/posts', postRouter)


ConnectDB().then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`server is running http://localhost:${process.env.PORT}`);
    })
})
