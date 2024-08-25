const { Schema, model } = require("mongoose");
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")

const authSchema = new Schema({
    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    }
})

authSchema.pre("save", async function (next) {
    if(!this.isModified("password")) {
        next()
    }

    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

authSchema.methods.generateToken = async function() {
    try {
        return jwt.sign({
            id: this._id.toString(),
        }, process.env.TOKEN_SECRET, { expiresIn: '30d' });
    } catch (error) {
        console.error(error);
    }
}

const Auth = new model("auth", authSchema)

module.exports = Auth