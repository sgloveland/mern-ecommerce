const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')
const sessions = require('express-session')
const cookieParser = require('cookie-parser')
const Product = require("./models/Product")
const Order = require("./models/Order")

const app = express()
const products_route = require('./routes/products.js')
const cart_route = require('./routes/cart.js')
const order_route = require('./routes/orders.js')

require('dotenv').config()

mongoose.connect(process.env.MONGO_URI)
    .then((result) => {
        app.listen(4000)
    })
    .catch((error) => {
        console.log(error)
    })

app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(cors({credentials: true, origin: 'http://localhost:3000'}))
app.use(cookieParser('INF124-A3-Test'))
app.use(sessions({
    secret: 'INF124-A3-Test',
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000*60*60*24,
        secure: false
    }
}))

app.set('views', __dirname + '/views');
app.set('view engine', 'jsx');
app.engine('jsx', require('express-react-views').createEngine());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000")
    next()
})
app.use(express.static(__dirname + '/public'));

app.get("/", (req, res) => {
    session = req.session
    if(!session.cart) {
        session.cart = []
    }
    res.send("Hopefully set cookie")
})

app.get("/products", async (req, res) => {
    try {
        const allProducts = await Product.find({}).select('name brand price imageURL')

        res.render('ProductsPage', {products: allProducts})
    }
    catch(error) {
        res.status(500).send({error})
    }
})

app.get("/product/:id", (req, res) => {
    const productId = req.params.id
    Product.findById(productId)
        .then((response) => {
            res.render('ProductDetails', 
            {
                name: response.name, 
                brand: response.brand, 
                price: response.price,
                imageURL: response.imageURL,
                description: response.description,
                sizes: response.sizes
            })
        })
        .catch((error) => {
            console.log("Error finding product: " + error)
            res.status(500).send({error})
        })
})

app.get("/order/:id", (req, res) => {
    const orderId = new mongoose.Types.ObjectId(req.params.id)
    Order.findById(orderId)
        .then(async (order) => {
            Product.find({
                _id: {$in: order.products}
            }).select('name brand price imageURL')
            .then(products => {
                res.render("OrderPage", {order: order, products: products})
            })
            .catch(error => console.log(error))
        })
        .catch((error) => {
            res.status(500).send({error})
        })
})

app.use('/api/cart', cart_route)
app.use('/api/products', products_route)
app.use('/api/orders', order_route)