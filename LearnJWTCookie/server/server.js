require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const ConnectDB = require('./utils/db');
const authRouter = require('./router/auth-router');

const app = express();
const PORT = 5000;


app.use(express.json());
app.use(cookieParser());
app.use(cors());


app.use('/auth', authRouter);


ConnectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port http://localhost:${PORT}`);
    })
}).catch((err) => {
    console.log(err);
})

