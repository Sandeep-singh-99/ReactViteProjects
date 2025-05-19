const Todo = require('../models/todo.model');

const addTodo = async (title) => {
    const todo = await Todo.create({ title })
    return todo;
}

const getTodos = async () => {
    const todos = await Todo.find();
    return todos;
}

const getTodoById = async (id) => {
  const todo = await Todo.findById(id);
  return todo;
};

module.exports = {
    addTodo,
    getTodos,
    getTodoById
}