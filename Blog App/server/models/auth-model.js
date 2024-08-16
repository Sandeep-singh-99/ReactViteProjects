const { Schema, model } = require("mongoose");
const jwt = require("jsonwebtoken")

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

authSchema.methods.generateToken = async function() {
    try {
        return jwt.sign({
            userId: this._id.toString(),
        }, process.env.TOKEN_SECRET, { expiresIn: '30d' });
    } catch (error) {
        console.error(error);
    }
}

const Auth = new model("auth", authSchema)

module.exports = Auth