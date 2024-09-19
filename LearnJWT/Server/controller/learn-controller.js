const Auth = require("../model/auth-model");
const Learn = require("../model/learn-jwt-model");
const jwt = require("jsonwebtoken");

const Registration = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const user = await Auth.create({ name, email, password })

        res.status(201).json({
            message: "User created successfully",
            success: true,
            data: user,
        })
    } catch (error) {
        res.status(501).json({
            success: false,
            message: error.message,
        })
    }
}

const Login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await Auth.findOne({ email });

        if (!user) {
            return res.status(401).json({
                message: "User not found",
                success: false,
            })
        }
        
        res.status(201).json({
            message: "User logged in successfully",
            success: true,
            data: user,
        })
    } catch (error) {
        res.status(501).json({
            message: error.message,
            success: false,
        })
    }
}

const getLearn = async (req, res) => {
    try {
        const learn = await Learn.find({});

        res.status(200).json({
            message: "Learn fetched successfully",
            success: true,
            data: learn,
        });
    } catch (error) {
        res.status(501).json({
            success: false,
            message: error.message,
        });
    }
};

const addLearn = async (req, res) => {
    try {
        const { description } = req.body;

        const learn = await Learn.create({
            description,
        });

        res.status(201).json({
            message: "Learn created successfully",
            success: true,
            data: learn,
        });
    } catch (error) {
        res.status(501).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = {
    getLearn,
    addLearn,
    Registration,
    Login
};
