const express = require('express')
const router = express.Router()

const {
    addToCart, 
    getCartItems,
    checkoutCartItems,
    isInCart,
    removeItem
} = require("../controllers/cart.js")

router.get('/', getCartItems)
router.get("/add/:id", addToCart)
router.get("/check/:id", isInCart)
router.post("/checkout", checkoutCartItems)
router.delete("/remove/:id", removeItem)

module.exports = router