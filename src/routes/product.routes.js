const express = require("express")

const upload = require("../middleware/upload.middleware")
const authentication = require("../middleware/authentication.middleware")

const {
    getProductList,
    createProduct,
    updateProduct,
    deleteProduct,
} = require("../controller/product.controller");

const router=express.Router()

router.get("/", getProductList)
router.post("/", authentication, upload.single("image"), createProduct)

module.exports = router;