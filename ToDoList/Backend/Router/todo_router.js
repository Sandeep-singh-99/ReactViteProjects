const express = require('express')
const router = express.Router()
const todoController = require("../Controller/todo_controller")

router.route("/").get(todoController.home)

router.route("/getToDoList").get(todoController.getToDoList)

router.route("/addToDoList").post(todoController.addToDoList)

router.route("/updateToDoList").put(todoController.updateToDoList)

router.route("/deleteToDoList").delete(todoController.deleteToDoList)

module.exports = router


