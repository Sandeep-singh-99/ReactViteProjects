const express = require('express')
const router = express.Router()
const taskController = require("../controller/task-controller")

router.route("/").get(taskController.home)

router.route("/tasks").get(taskController.getTask)

router.route("/tasks").post(taskController.addTask)

router.route("/tasks/:id").get(taskController.funTask, (req, res) => res.json(res.task))

router.route("/tasks/:id").put(taskController.funTask, taskController.updateTask)

router.route("/tasks/:id").delete(taskController.funTask, taskController.deleteTask)

module.exports = router