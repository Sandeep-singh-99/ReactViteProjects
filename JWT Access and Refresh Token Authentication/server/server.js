const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const AuthModel = require('./models/auth-model');

const app = express();
app.use(express.json());
app.use(cors({
    origin: ["http://localhost:3000"],
    credentials: true
}));
app.use(cookieParser());
const PORT = 5000

mongoose.connect('mongodb://localhost:27017/jwt-auth')

app.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    AuthModel.create({ name, email, password })
    .then(user => res.json(user))
    .catch(err => res.json(err))
})

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    AuthModel.findOne({ email })
    .then(user => {
        if (user) {
            if (user.password === password) {
                const accessToken = jwt.sign({ email: email }, 
                    "jwt-access-token-secret-key", { expiresIn: "3s"}
                )

                const refreshToken = jwt.sign({ email: email },
                    "jwt-refresh-token-secret", { expiresIn: "8s"}
                )

                res.cookie("accessToken", accessToken, { maxAge: 60000 })

                res.cookie("refreshToken", refreshToken, { maxAge: 300000, httpOnly: true, secure: true, sameSite: 'strict'})
                return res.json({ Login: true})
            }
        } else {
            res.json({ Login: false, message: "no record" })
        }
    }).catch(err => res.json(err))
})


const verifyToken = (req, res, next) => {
    const accessToken = req.cookies.accessToken;

    if (!accessToken) {
        return res.json({ valid: false, message: "No Access Token" });
    }

    jwt.verify(accessToken, 'jwt-access-token-secret-key', (err, decoded) => {
        if (err) {
            // Expire the cookie if the token is invalid
            res.clearCookie('accessToken');
            res.clearCookie('refreshToken');
            return res.json({ valid: false, message: "Invalid Access Token" });
        } else {
            req.email = decoded.email;
            next(); // Proceed to the next middleware or route handler
        }
    });
};

// Handle refresh token similarly if it is expired or invalid
const renewToken = (req, res, next) => {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
        return res.json({ valid: false, message: "No Refresh Token" });
    }

    jwt.verify(refreshToken, 'jwt-refresh-token-secret-key', (err, decoded) => {
        if (err) {
            // Expire the refresh token if it's invalid
            res.clearCookie('refreshToken');
            return res.json({ valid: false, message: "Invalid Refresh Token" });
        } else {
            const newAccessToken = jwt.sign({ email: decoded.email }, "jwt-access-token-secret-key", { expiresIn: "1m" });
            res.cookie("accessToken", newAccessToken, { maxAge: 60000 }); // Reset the access token
            req.email = decoded.email;
            next(); // Proceed to the next middleware or route handler
        }
    });
};



app.get('/dashboard', verifyToken, (req, res) => {
    return res.json({ valid: true, message: "User authenticated"})
})

app.listen(PORT, () => {
    console.log(`server is running at http://localhost:${PORT}`);
})