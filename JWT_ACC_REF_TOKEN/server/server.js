import express from "express";
import jwt from "jsonwebtoken";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import StudentModel from "./models/Student.js";

const app = express();
const PORT = 5001;

// Middleware
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true, // Enable cookies in the browser
  })
);
app.use(cookieParser());
app.use(express.json());

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/school");

// Helper function to generate tokens
const generateTokens = (email) => {
  const accessToken = jwt.sign({ email }, "jwt-access-token-secret-key", {
    expiresIn: "10s",
  });

  const refreshToken = jwt.sign({ email }, "jwt-refresh-token-secret-key", {
    expiresIn: "5m",
  });

  return { accessToken, refreshToken };
};

// Routes
app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const user = await StudentModel.create({ name, email, password });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Error registering user", error: err });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await StudentModel.findOne({ email });

  if (!user) return res.status(404).json({ message: "User not found" });
  if (password !== user.password)
    return res.status(401).json({ message: "Password is incorrect" });

  const { accessToken, refreshToken } = generateTokens(email);

  res.cookie("accessToken", accessToken, {
    maxAge: 10000, // 10 seconds
    httpOnly: true,
    secure: true,
    sameSite: "strict",
  });
  res.cookie("refreshToken", refreshToken, {
    maxAge: 300000, // 1 minute
    httpOnly: true,
    secure: true,
    sameSite: "strict",
  });

  res.json({ message: "Login Success" });
});

// Middleware to verify access token and refresh if needed
const verifyUser = async (req, res, next) => {
  const accessToken = req.cookies.accessToken;
  console.log("Request cookies: ", req.cookies);
  
  if (!accessToken) {
    const tokenRenewed = await renewToken(req, res);
    if (tokenRenewed) {
      return next();
    }
    return; // Stop processing if token renewal failed
  }

  jwt.verify(accessToken, "jwt-access-token-secret-key", (err, user) => {
    if (err) {
      if (err.name === "TokenExpiredError") {
        renewToken(req, res)
          .then((tokenRenewed) => {
            if (tokenRenewed) next();
          })
          .catch(() =>
            res.status(401).json({ message: "Unauthorized", valid: false })
          );
      } else {
        return res.status(401).json({ message: "Unauthorized", valid: false });
      }
    } else {
      req.email = user.email;
      next();
    }
  });
};

const renewToken = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    res.status(401).json({ message: "Unauthorized", valid: false });
    return false;
  }

  try {
    const user = jwt.verify(refreshToken, "jwt-refresh-token-secret-key");
    const { accessToken } = generateTokens(user.email);

    res.cookie("accessToken", accessToken, {
      maxAge: 10000, // 10 seconds
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });

    return true; // Indicate successful renewal
  } catch (err) {
    res.status(401).json({ message: "Unauthorized", valid: false });
    return false;
  }
};

// Protected Route
app.get("/dashboard", verifyUser, (req, res) => {
  res.json({ message: "Authorized", valid: true });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
