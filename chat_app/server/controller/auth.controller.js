import cloudinary from "../lib/cloudinary.js";
import { generateToken } from "../lib/utils.js";
import User from "../models/users.model.js";
import bcrypt from "bcryptjs";

export const signup = async (req, res) => {
  const { fullName, email, password } = req.body;
  try {
    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters long" });
    }

    const userExists = await User.findOneAndDelete({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hash = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, hash);

    const newUser = await User.create({
      fullName,
      email,
      password: hashPassword,
    });

    if (newUser) {
      generateToken(newUser._id, res);
      await newUser.save();
      return res
        .status(201)
        .json({
          message: "User created successfully",
          _id: newUser._id,
          fullName: newUser.fullName,
          email: newUser.email,
        });
    } else {
      return res.status(400).json({ message: "Failed to create user" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const userExists = await User.findOne({ email });
    if (!userExists) {
      return res.status(404).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, userExists.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    generateToken(userExists._id, res);
    return res
      .status(200)
      .json({
        message: "Logged in successfully",
        _id: userExists._id,
        fullName: userExists.fullName,
        email: userExists.email,
      });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const logout = async (req, res) => {
  try {
    res.cookie("token", "", {maxAge: 0});
    return res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { profilePic } = req.body;
    const userId = req.user._id;

    if (!profilePic) {
      return res.status(400).json({ message: "Profile pic is required" });
    }

    const uploadResponse = await cloudinary.uploader.upload(profilePic);
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profilePic: uploadResponse.secure_url },
      { new: true }
    );

    res.status(200).json(updatedUser);
  } catch (error) {
    console.log("error in update profile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const checkAuth = async (req, res) => {
    try {
        res.status(200).json(req.user);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}