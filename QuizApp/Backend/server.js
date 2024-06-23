const express = require('express')
const app = express()
const cors = require('cors')
const morgan = require('morgan')
const port = 5000
const homeRouter = require('./router/home-router')

app.use(express.json()) // middleware
app.use(cors())
app.use(morgan('tiny'))

app.use("/api/quiz", homeRouter)


app.listen(port, () => {
    console.log(`Server is running http://localhost:${port}`);
})
