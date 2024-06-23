const express = require('express')
const app = express()
const cors = require('cors')
const morgan = require('morgan')
const port = 5000
const homeRouter = require('./router/home-router')
const questionRouter = require("./router/question-router")
const resultRouter = require("./router/result-router")
const ConnectDB = require("./utils/db")

app.use(express.json()) // middleware
app.use(cors())
app.use(morgan('tiny'))

app.use("/", homeRouter)
app.use("/api/quiz", questionRouter)
app.use("/api/quiz", resultRouter)

ConnectDB.then(() => {
    app.listen(port, () => {
        console.log(`Server is running http://localhost:${port}`);
    })    
})