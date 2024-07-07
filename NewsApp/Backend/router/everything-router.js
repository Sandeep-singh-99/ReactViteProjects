const express = require('express')
const router = express.Router()
const everythingController = require("../controller/everything-controller")

router.route("/everything").get(everythingController.getAll)

module.exports = router
