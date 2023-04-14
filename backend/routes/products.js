const express = require('express')
const router = express.Router()

const {
    getProducts,
    getSingleProduct,
    updateProduct
} = require('../controllers/products.js')

router.get('/', getProducts)
router.get('/:id', getSingleProduct)
router.put('/:id', updateProduct)

module.exports = router