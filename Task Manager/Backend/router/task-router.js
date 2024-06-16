const express = require('express')
const router = express.Router()
const taskController = require("../controller/task-controller")

router.route("/").get(taskController.home)

module.exports = router