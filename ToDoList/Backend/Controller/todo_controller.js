const ToDoModel = require("../Model/todo-model");

const home = async (req, res) => {
    try {
        res.json("Welcome to the home page");
    } catch (error) {
        res.status(500).json("Internal server error");
    }
};

const addToDoList = async (req, res) => {
    try {
        const todo = await ToDoModel.create({
            task: req.body.task,
            status: req.body.status,
            deadline: req.body.deadline,
        });
        res.json(todo);
    } catch (err) {
        res.status(500).json(err);
    }
};

const getToDoList = async (req, res) => {
    try {
        const todolist = await ToDoModel.find({});
        res.json(todolist);
    } catch (err) {
        res.status(500).json(err);
    }
};

const updateToDoList = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = {
            task: req.body.task,
            status: req.body.status,
            deadline: req.body.deadline,
        };
        const todo = await ToDoModel.findByIdAndUpdate(id, updateData, { new: true });
        res.json(todo);
    } catch (err) {
        res.status(500).json(err);
    }
};

const deleteToDoList = async (req, res) => {
    try {
        const { id } = req.params;
        const todo = await ToDoModel.findByIdAndDelete(id);
        res.json(todo);
    } catch (err) {
        res.status(500).json(err);
    }
};

module.exports = { home, addToDoList, getToDoList, updateToDoList, deleteToDoList };
