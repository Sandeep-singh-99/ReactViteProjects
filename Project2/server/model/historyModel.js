const { Schema, model} = require("mongoose");

const historyModel = new Schema({
    historys: {
        type: Schema.Types.ObjectId,
        ref: 'content',
        required: true
    }
}, {timestamps: true})

const History = new model("history", historyModel)

module.exports = History