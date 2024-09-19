const { Schema, model } = require("mongoose");

const jwtSchema = new Schema({
    description: {
        type: String,
        required: true
    },
})

const Learn = new model('learn', jwtSchema)

module.exports = Learn