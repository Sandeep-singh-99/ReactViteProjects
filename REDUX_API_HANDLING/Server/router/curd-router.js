const express = require("express")
const router = express.Router()
const crudController = require("../controller/curd-controller")

router.route("/get-user").get(crudController.getCRUD)

router.route("/add-user").post(crudController.addCRUD)

router.route("/update-user/:id").put(crudController.updatedCRUD)

router.route("/delete-user/:id").delete(crudController.deleteCRUD)

module.exports = router