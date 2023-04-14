const Order = require('../models/Order.js')
const Product = require('../models/Product.js')

const getLastFiveProducts = (async (req, res) => {
    const products = []
    try {
        const orders = await Order.find({}).sort({_id: -1})
        orders.map((order) => {
            order.products.map((productId) => {
                if(!products.includes(productId) && products.length < 5) {
                    products.push(productId)
                }
            })
        })
        
        const result = await Product.find({
            _id: {$in: products}
        })
        res.status(200).json({result})
    }
    catch(error) {
        console.log(error)
        res.status(500).send({msg: error})
    }
})

const getOrder = (async (req, res) => {
    try {
        const orderId = req.params.id
        const result = await Order.findById(orderId)
        res.status(200).json({result})
    }
    catch (error) {
        res.status(500).json({msg: error})
    }
})

module.exports = {
    getLastFiveProducts,
    getOrder
}