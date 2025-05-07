const express = require('express');
const dotenv = require('dotenv').config();
const morgan = require('morgan');

const app = express()
const PORT = process.env.PORT || 5001
const ConnectDB = require('./config/db')
const authRoute = require('./router/auth.route')
const userRoute = require('./router/user.route')

app.use(express.json())
app.use(morgan('dev'))


app.use('/api/auth', authRoute)
app.use('/api/user', userRoute)


app.listen(PORT, () => {
    ConnectDB()
    console.log(`server is running on http://localhost:${PORT}`);
})