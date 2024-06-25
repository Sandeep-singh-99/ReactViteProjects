require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const path = require('path')
const multer = require('multer')
const ConnectDB = require('./utils/db')

app.use(express.json())
app.use(cors())
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({storage: storage})


ConnectDB().then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`server is running http://localhost:${process.env.PORT}`);
    })
})
