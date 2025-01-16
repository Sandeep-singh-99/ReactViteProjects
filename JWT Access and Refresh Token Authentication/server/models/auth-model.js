const { Schema, model } = require("mongoose");

const authSchema = new Schema({
    name: String,
    email: String,
    password: String,
})

const Auth = model("Auth", authSchema);

module.exports = Auth;