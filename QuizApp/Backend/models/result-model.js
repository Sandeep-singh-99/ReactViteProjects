const { Schema, model } = require("mongoose");

const resultSchema = new Schema({
    username: {
        type: String,
        required: true,
    },

    result: {
        type: Array,
        default: []
    },

    attempts: {
        type: Number,
        default: 0
    },

    points: {
        type: Number,
        default: 0,
    },

    achived: {
        type: String,
        default: ''
    },

    createdAt: {
        type: Date,
        default: Date.now
    }
})

const resultModel = new model('resultlist', resultSchema)

module.exports = resultModel