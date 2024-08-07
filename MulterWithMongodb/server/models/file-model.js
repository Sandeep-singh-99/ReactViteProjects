const { Schema, model } = require("mongoose");


const fileSchema = new Schema({
    filename: {
        type: String,
        required: true
    },

    path: {
        type: String,
        required: true
    },

    mimetype: {
        type: String,
        required: true
    },

    size: {
        type: Number,
        required: true
    }
}, { timestamps: true })

const UploadModel = new model('file', fileSchema)

module.exports = UploadModel