const express = require("express")
const router = express.Router()
// const validate = require("../middlewares/vaildate-middlewares")
const todoContoller = require("../controller/todo-controller")
// const todoModel = require("../model/todoModel")

router.route("/addtodo").post( todoContoller.addContent)

router.route("/getTodo").get(todoContoller.getContent)

router.route("/deleteContent").delete(todoContoller.deleteContent)

router.route("/history").get(todoContoller.getHistory)

module.exports = router