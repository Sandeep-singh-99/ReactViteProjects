const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require("../models/auth-models")


// User registration
const register = async (req, res) => {
    const {name, email, password} = req.body

    User.findOne({email}).then(user => {
        if (user) {
            return res.status(400).json({msg: "Email already exists"})
        }

        const newUser = new User({name, email, password})

        //Hash password
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
                if (err) throw err;
                newUser.password = hash
                newUser.save().then(user => res.json(user))
            })
        })
    })
}

// user login

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: "User not found" });
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: "Password incorrect" });
        }

        // Create payload and sign the token
        const payload = { id: user.id, name: user.name };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Respond with token
        return res.status(200).json({
            success: true,
            message: 'User logged in',
            data: token
        });
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ msg: 'Server error' });
    }
};

module.exports = {register, login}