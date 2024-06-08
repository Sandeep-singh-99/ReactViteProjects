const express = require('express')
const router = express.Router()
const todoController = require("../Controller/todo_controller")

router.route("/").get(todoController.home)

router.route("/getToDoList").get(todoController.getToDoList)

router.route("/addToDoList").get(todoController.addToDoList)

router.route("/updateToDoList").post(todoController.updateToDoList)

router.route("/deleteToDoList").delete(todoController.deleteToDoList)

module.exports = router


