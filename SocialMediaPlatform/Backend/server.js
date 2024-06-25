require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const path = require('path')
const multer = require('multer')
const ConnectDB = require('./utils/db')
const postRouter = require('./router/social-router')

app.use(express.json())
app.use(cors())
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))


app.use('/api/posts', postRouter)


ConnectDB().then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`server is running http://localhost:${process.env.PORT}`);
    })
})
