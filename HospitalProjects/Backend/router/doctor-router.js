const express = require('express')
const router = express.Router()
const doctorController = require("../controller/doctor-controller")

router.route("/").get(doctorController.getDoctor)

router.route("/add").post(doctorController.addDoctor)

router.route("/update/:id").put(doctorController.updateDoctor)

router.route("/delete/:id").delete(doctorController.deleteDoctor)

module.exports = router