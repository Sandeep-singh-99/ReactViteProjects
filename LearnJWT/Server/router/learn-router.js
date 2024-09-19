const express = require('express')
const { getLearn, addLearn, Registration, Login } = require('../controller/learn-controller')
const router = express.Router()

router.route("/getlearnjwt").get(getLearn)

router.route("/addlearnjwt").post(addLearn)

router.route('/register').post(Registration)

router.route('/login').post(Login)

module.exports = router