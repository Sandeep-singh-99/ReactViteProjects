const Doctor = require("../models/doctor-models")

const getDoctor = async (req, res) => {
    Doctor.find().then(doctor => res.json(doctor))
    .catch(err => res.status(400).json({err: "Error"}))
}

const addDoctor = async (req, res) => {
    const {name, specialty} = req.body

    const newDoctor = new Doctor({name, specialty})

    newDoctor.save().then(saveDoctor => res.json(saveDoctor))
    .catch(err => res.status(400).json({err: "Error"}))
}

const updateDoctor = async (req, res) => {
    Doctor.findById(req.params.id)
    .then(doctor => {
        if (!doctor) {
            return res.status(404).json("Doctor not found")
        }

        doctor.name = req.body.name;
        doctor.specialty = req.body.specialty;

        doctor.save()
        .then(() => res.json('Doctor updated'))
        .catch(err => res.status(400).json({err: "Error"}))
    })
    .catch(err => res.status(400).json({err: "Error"}))
}

const deleteDoctor = async (req, res) => {
    Doctor.findByIdAndDelete(req.params.id)
    .then(doctor => {
        if (!doctor) {
            return res.status(404).json('Doctor not found')
        }
        res.json('Doctor deleted!')
    })
    .catch(err => res.status(400).json({err: "Error"}))
}

module.exports = {getDoctor, addDoctor, updateDoctor, deleteDoctor}

