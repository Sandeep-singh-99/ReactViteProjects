const { Schema, model } = require("mongoose");
const jwt = require("jsonwebtoken")

const todoModel = new Schema({
    content: {
        type: String,
        required: true
    },

    date: {
        type: Date,
      // required: true,
        default: Date.now,
    },
}, {timestamps: true})


// Method to generate JWT token
todoModel.methods.generateToken = function () {
    try {
        const payload = {
            userId: this._id.toString(),
            content: this.content,
            date: this.date
        };
        const token = jwt.sign(payload, process.env.JSONWEBTOKEN, { expiresIn: '30d' });
        return token;
    } catch (error) {
        console.error('Error generating token:', error);
        throw new Error('Token generation failed');
    }
};


const ToDo = new model("content", todoModel)


module.exports = ToDo