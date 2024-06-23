const express = require('express')
const router = express.Router()
const homeController = require('../controller/home-controller')

router.route("/").get(homeController.home)
module.exports = router