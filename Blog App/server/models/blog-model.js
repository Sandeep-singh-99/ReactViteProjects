const { Schema, model, default: mongoose } = require("mongoose");

const blogSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    image: {
        type: String,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'auth',
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const Blog = new model("blog", blogSchema)

module.exports = Blog