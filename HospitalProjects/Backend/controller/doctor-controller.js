const Doctor = require("../models/doctor-models")

const getDoctor = async (req, res) => {
    Doctor.find().then(doctor => res.json(doctor))
    .catch(err => res.status(400).json('Error: ', err))
}

const addDoctor = async (req, res) => {
    const {name, specialty} = req.body

    const newDoctor = new Doctor({name, specialty})

    newDoctor.save().then(saveDoctor => res.json(saveDoctor))
    .catch(err => res.status(400).json('Error: ', err))
}

const updateDoctor = async (req, res) => {
    Doctor.findById(req.params.id)
    .then(doctor => {
        if (!doctor) {
            return res.status(404).json('Doctor not found')
        }

        doctor.name = req.body.name;
        doctor.specialty = req.body.specialty;

        doctor.save()
        .then(() => res.json('Doctor updated'))
        .catch(err => res.status(400).json('Error: ', err))
    })
    .catch(err => res.status(400).json("Error: ", err))
}

const deleteDoctor = async (req, res) => {
    Doctor.findByIdAndDelete(req.params.id)
    .then(doctor => {
        if (!doctor) {
            return res.status(404).json('Doctor not found')
        }
        res.json('Doctor deleted!')
    })
    .catch(err => res.status(400).json('Error: ', err))
}

module.exports = {getDoctor, addDoctor, updateDoctor, deleteDoctor}

