const Appointment = require("../models/appointment-models")

const getAppointment = async (req, res) => {
    Appointment.find()
    .then(appointment => res.json(appointment))
    .catch(err => res.status(400).json('Error: ', err))
}

const addAppointment = async (req, res) => {
    const {patientName, doctorName, date} = req.body

    const newAppointment = new Appointment({patientName, doctorName, date})

    newAppointment.save()
    .then(saveAppointment => res.json(saveAppointment))
    .catch(err => res.status(400).json('Erro: ', err))
}

const updateAppointment = async (req, res) => {
    Appointment.findById(req.params.id)
    .then(appointment => {
        appointment.patientName = req.body.patientName;
        appointment.doctorName = req.body.doctorName;
        appointment.date = req.body.date;

        appointment.save()
        .then(() => res.json('Appointment updated!'))
        .catch(err => res.status(400).json('Error: ', err))
    })
    .catch(err => res.status(400).json('Error: ', err))
}

const deleteAppointment = async (req, res) => {
    Appointment.findByIdAndDelete(req.params.id)
    .then(() => res.json('Appointment Delete'))
    .catch(err => res.status(400).json('Error: ', err))
}

module.exports = {getAppointment, addAppointment, updateAppointment, deleteAppointment}