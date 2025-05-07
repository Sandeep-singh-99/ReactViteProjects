const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../model/user.model");

const register = async (req, res) => {
    try {
        const { username, email, password, role } = req.body;

        const hashPassword = await bcrypt.hash(password, 10)

        const newUser = await User.create({ username, email, password: hashPassword, role });

        res.status(201).json({ message: "User created successfully", newUser});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        const user = await User.findOne({ email })

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}

module.exports = {
    register,
    login
}