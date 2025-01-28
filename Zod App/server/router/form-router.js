const express = require("express")

const formController = require("../controller/form-controller.js")

const router = express.Router()

router.route("/add-form").post(formController.addForm)

router.route("/view-all-form").get(formController.viewForm)

module.exports = router;
