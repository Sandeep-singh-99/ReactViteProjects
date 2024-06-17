const { Schema, model } = require("mongoose");

const doctorSchema = new Schema({
    name: {
        type: String,
        required: true,
    },

    specialty: {
        type: String,
        required: true,
    }
})

const Doctor = new model("doctorlist", doctorSchema)

module.exports = Doctor