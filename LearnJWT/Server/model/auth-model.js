const { Schema, model } = require("mongoose");

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

const Auth = new model('auth', authSchema)

module.exports = Auth