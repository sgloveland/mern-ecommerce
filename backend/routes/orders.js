const express = require('express')
const router = express.Router()

const {
    getLastFiveProducts,
    getOrder
} = require('../controllers/orders.js')

router.get("/", getLastFiveProducts)
router.get("/:id", getOrder)


module.exports = router