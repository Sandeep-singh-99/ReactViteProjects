const { Schema, model } = require('mongoose');

const ImageSchema = new Schema({
    imageUrl: {
        type: String,
        required: true,
    },
    thumbnailUrl: {
        type: String,
        required: true,
    },
    imageName: {
        type: String,
        required: true,
    },
    imagekitFileId: {
        type: String,
        required: true,
    },
    uploadedAt: {
        type: Date,
        default: Date.now,
    },
})

module.exports = model('Image', ImageSchema);