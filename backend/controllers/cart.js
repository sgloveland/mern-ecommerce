const Product = require('../models/Product.js')
const Order = require('../models/Order')

const addToCart = ((req, res) => {
    if (!req.session.cart) {
        req.session.cart = []
    }

    if(req.session.cart?.includes(req.params.id)) {
        res.status(500).send({msg: "Item already in cart"})
    }
    else {
        req.session.cart.push(req.params.id)
        req.session.save()
    }
})

const isInCart = ((req, res) => {
    if(req.session.cart?.includes(req.params.id)) {
        res.send({isInCart: true})
    }
    else {
        res.send({isInCart: false})
    }
})

const getCartItems = ((req, res) => {
    Product.find({
        _id: {$in: req.session.cart}
    }).select('name brand price imageURL')
    .then(result => res.status(200).json({result}))
    .catch(error => console.log(error))
})

const checkoutCartItems = ((req, res) => {
    if(!req.body.firstName || !req.body.lastName || !req.body.email 
        || !req.body.phone || !req.body.creditCardNo || !req.body.address
        || !req.body.shippingMethod || req.session.cart.length === 0) {
            return res.status(500).json({msg: "One or more fields missing"})
    }
    
    if(req.body.phone.length !== 10 || isNaN(req.body.phone)) {
        return res.status(500).json({msg: "Invalid phone number"})
    }

    if(req.body.creditCardNo.length !== 16 || isNaN(req.body.creditCardNo)) {
        return res.status(500).json({msg: "Invalid credit card number"})
    }

    if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(req.body.email)) {
        console.log("Invalid email")
        return res.status(500).json({msg: "Invalid email address"})
    }

    Order.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        phone: req.body.phone,
        creditCardNo: req.body.creditCardNo,
        address: req.body.address,
        shippingMethod: req.body.shippingMethod,
        products: req.session.cart
    })
    .then((result) => {
        req.session.cart = [];
        req.session.save()
        res.status(200).json({result})
    })
    .catch((error) => res.status(500).json({msg: error}))
})

const removeItem = ((req, res) => {
    const itemId = req.params.id
    req.session.cart = [...req.session.cart.filter((item) => item !== itemId)]
    req.session.save()
})

module.exports = {
    addToCart,
    getCartItems,
    checkoutCartItems,
    isInCart,
    removeItem
}