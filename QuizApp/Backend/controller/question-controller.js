const questions,{ answer } = require("../database/data")
const questionModel = require("../models/question-model")

const getQuestion = async (req, res) => {
    try {
        let q = await questionModel.find()
        if (q.length === 0)
            await questionModel.insertMany({questions, answer})
    } catch (error) {
        
    }
}