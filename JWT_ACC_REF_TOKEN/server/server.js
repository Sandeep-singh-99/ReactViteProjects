import express from "express";
import jwt from "jsonwebtoken";
import cors from "cors";
import cookie from "cookie-parser";
import mongoose from "mongoose";
import StudentModel from "./models/Student.js";

const app = express();
const PORT = 5000;

app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true, // enable set cookie in browser, default is false
  })
);
app.use(cookie());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/school");

app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  await StudentModel.create({ name, email, password })
    .then((user) => res.json(user))
    .catch((err) => res.json(err));
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await StudentModel.findOne({ email });
  if (!user) return res.json({ message: "User not found" });

  if (password !== user.password)
    return res.json({ message: "Password is incorrect" });

  const accessToken = jwt.sign(
    { email: email },
    "jwt-access-token-secret-key",
    { expiresIn: "10s" }
  );

  const refreshToken = jwt.sign(
    { email: email },
    "jwt-refresh-token-secret-key",
    { expiresIn: "30s" }
  );

  res.cookie("accessToken", accessToken, {
    maxAge: 10000,
    httpOnly: true,
  });
  res.cookie("refreshToken", refreshToken, {
    maxAge: 30000,
    httpOnly: true,
    secure: true,
    sameSite: "strict",
  });

  res.json({ message: "Login Success" });
});

const verifyUser = async (req, res, next) => {
  const accessToken = req.cookies.accessToken;

  if (!accessToken) {
    const renewed = await renewToken(req, res);
    if (renewed) {
      next(); // Proceed if token is renewed successfully
    } else {
      return; // Stop processing if renewal failed
    }
  } else {
    jwt.verify(accessToken, "jwt-access-token-secret-key", (err, user) => {
      if (err) {
        return res.status(401).json({ message: "Unauthorized", valid: false });
      }
      req.email = user.email;
      next();
    });
  }
};

const renewToken = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    return res.status(401).json({ message: "Unauthorized", valid: false });
  }

  try {
    const user = jwt.verify(refreshToken, "jwt-refresh-token-secret-key");
    const accessToken = jwt.sign(
      { email: user.email },
      "jwt-access-token-secret-key",
      { expiresIn: "10s" }
    );

    res.cookie("accessToken", accessToken, { maxAge: 10000, httpOnly: true });
    return true; // Indicate successful renewal
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized", valid: false });
  }
};

app.get("/dashboard", verifyUser, (req, res) => {
  return res.json({ message: "authorized", valid: true });
});

app.listen(PORT, () => {
  console.log(`server is running http://localhost:${PORT}`);
});
