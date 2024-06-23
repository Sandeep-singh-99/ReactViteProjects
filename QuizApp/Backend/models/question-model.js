const { Schema, model } = require("mongoose");

const questionSchema = new Schema({
    questions: {
        type: Array,
        default: []
    },
    answers: {
        type: Array,
        default: []
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const questionModel = new model('questionlist', questionSchema)

module.exports = questionModel