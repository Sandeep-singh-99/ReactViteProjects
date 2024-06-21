const Patient = require("../models/patients-models")

const getPatient = async (req, res) => {
    Patient.find()
    .then(patient => res.json(patient))
    .catch(err => res.status(400).json({err: "Error"}))
}

const addPatients = async (req, res) => {
    const {name, age, gender} = req.body;

    const newPatient = new Patient({name, age, gender})

    newPatient.save()
    .then(savedPatient => res.json(savedPatient))
    .catch(err => res.status(400).json({err: "Error"}))
}

const updatePatient = async (req, res) => {

}

const deletePatient = async (req, res) => {
    Patient.findByIdAndDelete(req.params.id)
    .then(patient => {
        if (!patient) {
            return res.status(404).json('Patient not found')
        }
        res.json('Patient deleted!')
    })
    .catch(err => res.status(400).json({err: "Error"}))
}

module.exports = {getPatient, addPatients, updatePatient, deletePatient}