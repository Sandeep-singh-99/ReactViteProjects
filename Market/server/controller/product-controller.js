const Product = require("../models/productSchema")

const getProduct = async (req, res) => {
    try {
        const pro1 = await Product.find()

        res.status(200).json(pro1)
    } catch (error) {
        res.status(500).json(error)
    }
}

const addProduct = async (req, res) => {
    try {
        const {name, desc, img, category, price} = req.body;

        const newProduct = new Product({name, desc, img, category, price})

        newProduct.save()

        res.status(200).json(newProduct)
    } catch (error) {
        res.status(500).json(error)
    }
}

module.exports = {getProduct, addProduct}