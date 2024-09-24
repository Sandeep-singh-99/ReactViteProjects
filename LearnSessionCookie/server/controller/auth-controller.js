const Auth = require("../models/auth-model");
const session = require("express-session");

const register = async (req, res) => {
    try {
        const {username, email, password} = req.body;

        const userExist = await Auth.findOne({email});

        if (userExist) {
            return res.status(400).json({
                success: false,
                message: "User already exist"
            })
        }

        const newUser = await Auth.create({
            username,
            email,
            password
        })

        res.status(201).json({
            success: true,
            message: "User created successfully",
            data: newUser
        })
    } catch (error) {
        res.status(501).json({
            success: false,
            message: error.message
        })
    }
}

const login = async (req, res) => {
    try {
        const {email, password} = req.body;

        const userExist = await Auth.findOne({email});

        if (!userExist) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }

        const validPassword = await userExist.comparePassword(password);

        if (!validPassword) {
            return res.status(401).json({
                success: false,
                message: "Invalid password"
            })
        }

        req.session.userExist = {email: userExist.email}

        res.status(200).json({
            success: true,
            message: "User logged in successfully",
            data: userExist
        })
    } catch (error) {
        res.status(501).json({
            success: false,
            message: error.message
        })
    }
}

const logout = async (req, res) => {
    try {
        req.session.destroy(err => {
            if (err) {
                res.status(501).json({
                    success: false,
                    message: 'Error logging out'
                })
            }

            res.clearCookie('connect.sid')
            res.status(200).json({
                success: true,
                message: 'User logged out successfully'
            })
        })
    } catch (error) {
        res.status(501).json({
            success: false,
            message: error.message
        })
    }
}

const dashboard = async (req, res) => {
    try {
        if (req.session.userExist) {
            res.status(200).json({
                success: true,
                message: 'User logged in successfully',
                data: req.session.userExist
            })
        } else {
            res.status(401).json({
                success: false,
                message: 'User not logged in'
            })
        }
    } catch (error) {
        res.status(501).json({
            success: false,
            message: error.message
        })
    }
}

module.exports = {
    register,
    login,
    logout,
    dashboard
}