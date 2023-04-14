const mongoose = require('mongoose')

const OrderSchema = mongoose.Schema({
    firstName: mongoose.SchemaTypes.String,
    lastName: mongoose.SchemaTypes.String,
    email: mongoose.SchemaTypes.String,
    phone: mongoose.SchemaTypes.String,
    creditCardNo: mongoose.SchemaTypes.String,
    address: mongoose.SchemaTypes.String,
    shippingMethod: mongoose.SchemaTypes.String,
    products: [mongoose.SchemaTypes.ObjectId]
})

const Order = mongoose.model('Order', OrderSchema)
module.exports = Order