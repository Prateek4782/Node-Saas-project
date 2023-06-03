const express = require ('express');
const ejs = require ('ejs');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
const session = require('express-session');
const mongoDbSession = require('connect-mongodb-session')(session);
const ObjectId = require('mongodb').ObjectId;
const bycrpt = require('bcrypt')
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:true}))
const router = require('./routes')
const Users = require('./model/Users')
const Callback = require('./model/Callbacks')
const Products = require('./model/Products')
const Payments = require('./model/Payments')
const Razorpay = require('razorpay')

const razorpay = new Razorpay({
    key_id:'rzp_test_qwkvj5Wiw96NH6',
    key_secret:'doTerFztzom14z88oNsIKWA7',
})


mongoose.connect('mongodb+srv://prateek:prateek@cluster0.yu4vtay.mongodb.net/?retryWrites=true&w=majority').then(()=>{
console.log("mongoDB is connected")
})

const store = new mongoDbSession({
    uri:'mongodb+srv://prateek:prateek@cluster0.yu4vtay.mongodb.net/?retryWrites=true&w=majority',
    collection: 'sass-sessions'
})

// setup sessions

app.use(session({
    secret: 'This is a secret project',
    resave: false,
    saveUninitialized:false,
    store:store
}))


// routes
app.use('/',router)
app.use('/request-callback', router)
app.use('/Callbacks',router)
app.use('/update-callback',router)
app.use('/store-update-callback', router)
app.use('/login',router)
app.use('/auth', router)
app.use('/create-user', router)
app.use('/products', router)
app.use('/create-product', router)
app.use('/store-product', router)
app.use('/edit-product', router)
app.use('/update-product', router)
app.use('/active-service', router)
app.use('/register', router)
app.use('/api-callbacks',router)
app.use('/checkout', router)
app.use('/payment-success', router)
app.use('/paid-users', router)
app.use('*',router)
// routes ends


app.listen(3000, ()=>{
    console.log("server running on port 3000")
})
