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
        const { task, status, deadline } = req.body;

        const todo = await ToDoModel.create({ task, status, deadline })

        res.status(200).json({
            message: "Todo created successfully",
            success: true,
            data: todo
        })
    } catch (err) {
        res.status(500).json({
            message: err.message,
            success: false
        });
    }
};

const getToDoList = async (req, res) => {
    try {
        const todolist = await ToDoModel.find({})
        res.status(200).json({
            message: "Todo fetched successfully",
            success: true,
            data: todolist
        })
    } catch (err) {
        res.status(500).json({
            message: err.message,
            success: false
        });
    }
};

const updateToDoList = async (req, res) => {
    try {
        const { id } = req.params;
        const { task, status, deadline } = req.body;
        const todo = await ToDoModel.findByIdAndUpdate(id, { task, status, deadline });

        res.status(200).json({
            message: "Todo updated successfully",
            success: true,
            data: todo
        })
    } catch (error) {
        res.status(500).json({
            message: error.message,
            success: false
        })
    }
};

const deleteToDoList = async (req, res) => {
    try {
        const { id } = req.params;
        const todo = await ToDoModel.findByIdAndDelete(id);
        res.status(200).json({
            message: "Todo deleted successfully",
            success: true,
            data: todo
        })
    } catch (error) {
        res.status(501).json({
            message: error.message,
            success: false
        })
    }
};

module.exports = { home, addToDoList, getToDoList, updateToDoList, deleteToDoList };
