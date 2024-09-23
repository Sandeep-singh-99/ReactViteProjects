const { Schema, model } = require("mongoose");

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const authSchema = new Schema ({
    username: {
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

authSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

authSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}

authSchema.methods.generateToken = function () {
    return jwt.sign({ _id: this._id }, process.env.SECRET, { expiresIn: '7d' });
}

const Auth = new model('AuthJWTCookie', authSchema);

module.exports = Auth;