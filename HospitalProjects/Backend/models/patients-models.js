const { Schema, model } = require("mongoose");

const patientSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    age: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true
    }
})

const Patient = new model("patientList", patientSchema)

module.exports = Patient