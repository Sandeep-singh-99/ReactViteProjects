const { Schema, model } = require("mongoose");

const appointmentSchema = new Schema({
    patientName: {
        type: String,
        required: true,
    },

    doctorName: {
        type: String,
        required: true,
    },

    date: {
        type: Date,
        required: true,
    }
})

const Appointment = new model("appoitmentList", appointmentSchema)

module.exports = Appointment