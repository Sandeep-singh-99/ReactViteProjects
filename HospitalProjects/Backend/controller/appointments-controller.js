const Appointment = require("../models/appointment-models")

const getAppointment = async (req, res) => {
    await Appointment.find()
    .then(appointment => res.json(appointment))
    .catch(err => res.status(404).json({err: "Error"}))
}

const addAppointment = async (req, res) => {
    const {patientName, doctorName, date} = req.body

    const newAppointment = new Appointment({patientName, doctorName, date})

    await newAppointment.save()
    .then(saveAppointment => res.json(saveAppointment))
    .catch(err => res.status(404).json({err: "Error"}))
}

const updateAppointment = async (req, res) => {
    await Appointment.findById(req.params.id)
    .then(appointment => {
        appointment.patientName = req.body.patientName;
        appointment.doctorName = req.body.doctorName;
        appointment.date = req.body.date;

         appointment.save()
        .then(() => res.json('Appointment updated!'))
        .catch(err => res.status(404).json({err: "Error"}))
    })
    .catch(err => res.status(404).json({err: "Error"}))
}

const deleteAppointment = async (req, res) => {
    await Appointment.findByIdAndDelete(req.params.id)
    .then(() => res.json('Appointment Delete'))
    .catch(err => res.status(404).json({err: "Error"}))
}

module.exports = {getAppointment, addAppointment, updateAppointment, deleteAppointment}