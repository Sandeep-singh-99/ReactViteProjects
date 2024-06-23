const resultModel = require("../models/result-model")


/** Get all results */
const getResult = async (req, res) => {
    try {
        const r = await resultModel.find()
        res.json(r)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

/** Post a new result */

const storeReult = async (req, res) => {
    try {
        const {username, result, attempt, points, achieved} = req.body
        if (!username || !result) throw new Error("Data Not Provided...");

        const newResult = await resultModel.create({username, result, attempt, points, achieved})
        res.json({msg: "Result Saved Successfullt...", result: newResult})
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

/** Delete all results */

const dropResult = async (req, res) => {
    try {
        await resultModel.deleteMany()
        res.json({msg: "Results Deleted Succesfully..."})
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

module.exports = {getResult, storeReult, dropResult}