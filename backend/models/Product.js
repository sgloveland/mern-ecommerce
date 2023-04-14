const mongoose = require('mongoose')

const ProductSchema = mongoose.Schema({
    id: mongoose.SchemaTypes.ObjectId,
    name: mongoose.SchemaTypes.String,
    brand: mongoose.SchemaTypes.String,
    price: mongoose.SchemaTypes.Number,
    sizes: mongoose.SchemaTypes.String,
    imageURL: mongoose.SchemaTypes.String,
    description: mongoose.SchemaTypes.String,
    rating: mongoose.SchemaTypes.Number
})

const Product = mongoose.model('Product', ProductSchema)

module.exports = Product