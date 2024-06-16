const { Schema, model } = require("mongoose");

const taskSchema = new Schema({
    title: {
        type: String,
        required: true,
    },

    description: {
        type: String,
        required: true,
    },

    status: {
        type: String,
        required: true,
    },
})

const tasklist = new model('tasklist', taskSchema)

module.exports = tasklist

