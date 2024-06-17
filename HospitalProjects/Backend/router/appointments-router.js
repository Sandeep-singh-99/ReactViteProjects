const express = require('express')
const router = express.Router()
const appointmentController = require("../controller/appointments-controller")

router.route("/").get(appointmentController.getAppointment)

router.route("/add").post(appointmentController.addAppointment)

router.route("/update/:id").put(appointmentController.updateAppointment)

router.route("/delete/:id").delete(appointmentController.deleteAppointment)

module.exports = router
