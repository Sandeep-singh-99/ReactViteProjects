const Task = require("../models/task-model")

const home = (req, res) => {
    try {
        res.json("Welcome to Home Page")
    } catch (error) {
        res.json("Internal server error")
    }
}

// Middleware to fetch a task by ID
async function funTask(req, res, next) {
    let task
    try {
         task = await Task.findById(req.params.id)
        if(!task) {
            return res.status(404).json({message: 'Task not found'})
        }
        res.task = task
        next()
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

const getTask = async (req, res) => {
    try {
        const tasks = await Task.find()
        res.json(tasks)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

const addTask = async (req, res) => {
    const task = new Task({
        title: req.body.title,
        description: req.body.description,
        status: req.body.status
    })
    try {
      const newTask = await task.save()
      res.status(201).json(newTask)  
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

const updateTask =  async (req, res) => {
    if (req.body.title != null) {
        res.task.title = req.body.title
    }
    if (req.body.description != null) {
        res.task.description = req.body.description
    }
    if (req.body.status != null) {
        res.task.status = req.body.status
    }
    try {
        const updatedTask = await res.task.save()
        res.json(updatedTask)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

const deleteTask = async (req, res) => {
    try {
        await res.task.deleteOne()
        res.json({message: 'Task Deleted'})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

module.exports = {home, getTask, addTask, funTask, updateTask, deleteTask}