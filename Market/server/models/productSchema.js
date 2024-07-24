const { Schema, model } = require("mongoose");

const productSchema = new Schema({
    name: {
        type: String,
        required: true
    },

    desc: {
        type: String,
        required: true,
    },

    img: {
        type: String,
        required: true
    },

    category: {
        type: String,
        required: true
    },

    price: {
        type: Number,
        required: true
    }
})

const Product = new model("product", productSchema)

module.exports = Product