const express = require('express')
const cors = require('cors')

const formRoutes = require('./router/form-router.js')
const ConnectDB = require('./utils/db.js')

const app = express()
const PORT = 5000

app.use(cors())
app.use(express.json())


app.use('/api/form', formRoutes)

ConnectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`server is running on http://localhost:${PORT}`);
    })
})