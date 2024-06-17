const express = require('express')
const router = express.Router()
const patientController = require("../controller/patients-controller")

router.route("/").get(patientController.getPatient)

router.route("/add").post(patientController.addPatients)

router.route("/update/:id").put(patientController.updatePatient)

router.route("/delete/:id").delete(patientController.deletePatient)


module.exports = router