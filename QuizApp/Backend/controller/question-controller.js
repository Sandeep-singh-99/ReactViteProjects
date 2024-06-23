const { default: questions } = require("../database/data")
const questionModel = require("../models/question-model")

/** Get all Questions */
const getQuestion = async (req, res) => {
    try {
        let q = await questionModel.find()
        if (q.length === 0) {
            await questionModel.insertMany(questions)
            q = await questionModel.find()
        }
        res.json(q)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}


/** Inset all Questions */

const insertQuestion = async (req, res) => {
    try {
        await questionModel.insertMany(questions)
        res.json({msg: "Questions Inserted Successfully..."})
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

/** Delete all Questions */

const dropQuestion = async (req, res) => {
    try {
        await questionModel.deleteMany()
        res.json({msg: "Questions Deleted Successfully..."})
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

module.exports = {getQuestion, insertQuestion, dropQuestion}