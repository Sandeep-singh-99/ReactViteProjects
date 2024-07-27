const CRUD = require("../model/crud-model")

const getCRUD = async(req, res) => {
    try {
        const user = await CRUD.find()

        res.status(200).json(user)
    } catch (error) {
        res.status(500).json(error.message)
    }
}

const addCRUD = async(req, res) => {
    try {
        const { name, number } = req.body;

        const user = await CRUD.create({ name, number })

        await user.save()

        res.status(200).json(user)
    } catch (error) {
        res.status(500).json(error.message)
    }
}

const deleteCRUD = async(req, res) => {
    try {
        const { id } = req.params;
        const user = await CRUD.findByIdAndDelete(id)
        
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json(error.message)
    }
}

const updatedCRUD = async(req, res) => {
    try {
        const { id } = req.params;
        const userUpdate = {name: req.body.name, number: req.body.number}

        const todo = await CRUD.findByIdAndUpdate(id, userUpdate, {new: true})

        res.status(200).json(todo)
    } catch (error) {
        res.status(500).json(error.message)
    }
}

module.exports = {getCRUD, addCRUD, deleteCRUD, updatedCRUD}