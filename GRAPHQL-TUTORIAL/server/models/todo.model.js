const { Schema, model } = require('mongoose');

const todoSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    }
})

const Todo = model('Todo', todoSchema);

module.exports = Todo;