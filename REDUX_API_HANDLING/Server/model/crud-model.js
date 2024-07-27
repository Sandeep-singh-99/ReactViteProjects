const { Schema, model } = require("mongoose");

const crudSchema = new Schema({
    name: {
        type: String,
        required: true
    },

    number: {
        type: Number,
        required: true
    }
})

const CRUD = new model("crud", crudSchema)

module.exports = CRUD