const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  let token;
  let authHeader = req.headers.authorization || req.headers.Authorization;

  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];

    console.log("Token:", token);

    if (!token) {
      return res.status(401).json({ message: "Unauthorized - No token" });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      console.log("Decoded token:", decoded);
      return next();
    } catch (error) {
      return res.status(401).json({ message: "Unauthorized - Invalid token" });
    }
  } else {
    return res.status(401).json({ message: "Unauthorized - No auth header" });
  }
};


module.exports = authMiddleware;