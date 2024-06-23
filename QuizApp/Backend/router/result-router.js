const express = require('express')
const router = express.Router()
const resultController = require("../controller/result-controller")

router.route("/result").get(resultController.getResult).post(resultController.storeReult).delete(resultController.dropResult)

module.exports = router