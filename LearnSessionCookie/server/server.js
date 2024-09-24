require('dotenv').config();
const express = require('express');
const session = require('express-session')


const app = express()
const PORT = 5000;
const ConnectDB = require('./utils/db');
const AuthRouter = require('./router/auth-router');

// Configure session middleware
app.use(session({
    secret: 'SECRET',
    resave: false,
    saveUninitialized: false, // only save session if something is stored in it
    cookie: { 
      maxAge: 1000 * 60 * 60,  // 1 hour session expiration
      secure: false,  // Set to true if using HTTPS
      httpOnly: true, // Prevent client-side access
    }
}));

app.use(express.json())

app.use('/api', AuthRouter)

ConnectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
  })
}).catch((err) => {
  console.log(err);
})


