const jwt = require("jsonwebtoken");
const Auth = require("../models/auth-model");

module.exports = async function (req, res, next) {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({
            message: "No token, authorized denied"
        })
    }

    try {
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET)
        req.user = await Auth.findById(decoded.id)
        next()
    } catch (error) {
        res.status(500).json({
            message: "Token is not valid",
            success: false
        })
    }
}