const jwt = require('jsonwebtoken');

const authMiddleware = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        console.log('Received token:', token);
        

        if (!token) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const decoded = jwt.verify(token, process.env.SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        console.error('JWT Verification Error:', error.message); // Log the error for debugging
        return res.status(402).json({ message: "Unauthorized Access" });
    }
}

module.exports = authMiddleware