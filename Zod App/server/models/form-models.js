const { model, Schema } = require("mongoose");


const formSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },

    lastName: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    phone: {
        type: Number,
        required: true
    },

    message: {
        type: String,
        required: true
    },

    date: {
        type: Date,
        default: Date.now()
    },

    description:{
        type: String,
        required: true
    }
})

const Form = model("Form", formSchema);

module.exports = Form;