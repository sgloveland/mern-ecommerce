const { findByIdAndUpdate } = require('../models/Product.js')
const Product = require('../models/Product.js')

const getProducts = ((req, res) => {
    Product.find({}).select('name brand price imageURL')
        .then(result => res.status(200).send({result}))
        .catch(error => res.status(500).send({error}))
})

const getSingleProduct = ((req, res) => {
    const productId = req.params.id
    Product.findById(productId)
        .then(result => {
            return res.status(200).send({result})
        })
        .catch(error => res.status(404).send({error}))
})

const updateProduct = (async (req, res) => {
    const productId = req.params.id
    try {
        await Product.findByIdAndUpdate(productId, {$set: {rating: req.body.rating}}, {new: true})
    }
    catch (error) {
        res.status(404).send({error})
    }
})

module.exports = {
    getProducts,
    getSingleProduct,
    updateProduct
}