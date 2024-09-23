const Auth = require("../models/auth-models");

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const userExist = await Auth.findOne({ email });

    if (userExist) {
      return res.status(400).json({ message: "User already exist" });
    }

    const user = await Auth.create({
      username,
      email,
      password,
    });

    const token = user.generateToken();

    res.cookie('token', token, {
      httpOnly: true,
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    })

    res.status(201).json({
        data: user,
        message: "User created successfully",
    })
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await Auth.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const isMatch = await user.comparePassword(password);

        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = user.generateToken()

        res.cookie('token', token , {
            httpOnly: true,
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        })

        res.status(200).json({ data: user, message: "Login successful" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


const logout = async (req, res) => {
    try {
        res.clearCookie('token');
        res.status(200).json({ message: "Logout successful" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


module.exports = {
    register,
    login,
    logout
}