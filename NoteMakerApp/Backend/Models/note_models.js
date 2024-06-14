const { Schema, model } = require("mongoose");

const noteSchema = new Schema({
    title: {
        type: String,
        required: true,
    },

    content: {
        type: String,
        required: true,
    }
})

const noteMakerApp = new model('notelist', noteSchema)

module.exports = noteMakerApp