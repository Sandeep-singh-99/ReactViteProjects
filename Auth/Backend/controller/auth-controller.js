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
    const {email, password} = req.body

    User.findOne({email}).then(user => {
        if (!user) {
            return res.status(400).json({msg: "User not found"})
        }

        // check password

        bcrypt.compare(password, user.password).then(isMatch => {
            if (isMatch) {
                const payload = {id: user.id, name: user.name}

                jwt.sign(payload, 'serect', {expiresIn: 3600}, (err, token) => {
                    if (err) throw err;
                    res.json({token: 'Bearer ' + token})
                })
            } else {
                return res.status(400).json({msg: 'Password incorrect'})
            }
        })
    })
}

module.exports = {register, login}