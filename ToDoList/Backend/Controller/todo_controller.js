const ToDoModel = require("../Model/todo-model")

const home = async (req, res) => {
    try {
        res.json("Welcome to home page")
    } catch (error) {
        res.json("Internal server error")
    }
}

const addToDoList = async (req, res) => {
    ToDoModel.create({
        task: req.body.task,
        status: req.body.status,
        deadline: req.body.deadline,
    })
    .then((todo) => res.json(todo))
    .catch((err) => res.json(err))
}

const getToDoList = async (req, res) => {
    ToDoModel.find({})
    .then((todolist) => res.json(todolist))
    .catch((err) => res.json(err))
}

const updateToDoList = async (req, res) => {
   const updateData = {
    task: req.body.task,
    status: req.body.status,
    deadline: req.body.deadline,
   };
   ToDoModel.findByIdAndUpdate(updateData)
   .then((todo) => res.json(todo))
   .catch((err) => res.json(err))
}

const deleteToDoList = async (req, res) => {
    ToDoModel.findByIdAndUpdate()
    .then((todo) => res.json(todo))
    .catch((err) => res.json(err))
}

module.exports = {home ,addToDoList, getToDoList, updateToDoList, deleteToDoList}