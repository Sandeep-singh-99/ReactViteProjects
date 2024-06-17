const express = require("express")
const app = express()
const port = 5000
const cors = require('cors')
const ConnectDB = require('./utils/db')

app.use(express.json())
app.use(cors())

ConnectDB().then(() => {
    app.listen(port, () => {
        console.log(`server is running http://localhost:${port}`);
    })
})

