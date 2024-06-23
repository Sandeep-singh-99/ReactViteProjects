const express = require('express')
const router = express.Router()
const questionController = require("../controller/question-controller")

router.route('/questions').get(questionController.getQuestion).post(questionController.insertQuestion).delete(questionController.dropQuestion)

module.exports = router