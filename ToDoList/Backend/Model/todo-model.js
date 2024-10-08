const {Schema, model} = require("mongoose")

const todoSchema = new Schema({
    task: {
        type: String,
        required: true,
    },

    status: {
        type: String,
        required: true,
    },

    deadline: {
        type: Date,
        default: Date.now
    }
})

const todolist = new model('todolist', todoSchema)

module.exports = todolist