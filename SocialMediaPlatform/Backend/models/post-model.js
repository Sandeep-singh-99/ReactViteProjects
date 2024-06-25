const { text } = require("express");
const { Schema, model } = require("mongoose");

const postSchema = new Schema({
    title: {
        type: String,
        required: true
    },

    content: {
        type: String,
        required: true,
    },

    likes: {
        type: Number,
        default: 0
    },

    comments: [
        {
            text: String,
        }
    ]
})

const Post = new model('Post', postSchema)

module.exports = Post