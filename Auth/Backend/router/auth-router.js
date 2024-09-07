const express = require('express')
const router = express.Router()
const userController = require("../controller/auth-controller")
const authValidationSchema = require('../validation/auth-validation')

router.route("/register").post(authValidationSchema, userController.register)

router.route("/login").post(authValidationSchema, userController.login)

module.exports = router