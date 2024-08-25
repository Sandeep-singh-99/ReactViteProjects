const jwt = require("jsonwebtoken");
const Auth = require("../models/auth-model");

module.exports = async function (req, res, next) {
    const token = req.header('Authorization')?.split(' ')[1];

    if (!token) {
        return res.status(401).json({
            message: "No token, authorization denied",
            success: false
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = await Auth.findById(decoded.id).select('-password');
        if (!req.user) {
            return res.status(401).json({ message: "User not found", success: false });
        }
        next();
    } catch (error) {
        res.status(401).json({
            message: "Token is not valid",
            success: false
        });
    }
};
