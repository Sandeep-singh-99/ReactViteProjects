const exress = require("express")
const router = exress.Router()
const productController = require("../controller/product-controller")

// get product
router.route("/get-product").get(productController.getProduct)


// add product
router.route("/upload-product").post(productController.addProduct)

module.exports = router;