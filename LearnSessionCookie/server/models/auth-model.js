const { Schema, model } = require("mongoose");
const bcrypt = require('bcryptjs');

const authSchema = new Schema({
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

const Auth = new model('AuthSessionCookie', authSchema);

module.exports = Auth