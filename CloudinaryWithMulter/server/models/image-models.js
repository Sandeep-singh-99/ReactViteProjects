const { Schema, model } = require("mongoose");

const imageSchema = new Schema({
    imageUrl: {
        type: String,
        required: true
    },

    cloudinaryId: {
        type: String,
    },

    createdAt: {
        type: Date,
        default: Date.now
    }
})

const ImgUploads = new model('ImgUploads', imageSchema)

module.exports = ImgUploads