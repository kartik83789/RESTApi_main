const express = require("express");
const app = express();
//import routes
const productsRoute = require('./api/routes/products');
const ordersRoute = require('./api/routes/orders');
const usersRoute = require('./api/routes/users');

//used modules
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

mongoose.connect(
    "mongodb+srv://kartikdange2002:GlMvUCbHT0qjx24d@restapi.mze6ump.mongodb.net/?retryWrites=true&w=majority"
    //{
    //    useMongooseClient: true
    //}
);

mongoose.Promise = global.Promise;

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());
app.use('/uploads', express.static('uploads'));

//middleware to route (requests funneled through here)
/*app.use((req, resp, next) => {
    console.log("Working");
    resp.json({
        meg : "Working"
    });
})*/

// middleware to handle CORS issue
app.use((req, res, next) => {
    res.header('Acess-Control-Allow-origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept,Authorization');
    if (req.method === 'OPTIONS') {
        res.header('Acess-Control-Allow-Methods', 'PUT, POST,DELETE, GET,PATCH');
        return res.status(200).json({});
    }
    next();
})

app.use('/products', productsRoute);
app.use('/orders', ordersRoute);
app.use('/users', usersRoute);


//error handle
app.use((req, resp, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    console.log("Not found error- from error thrower");
    //forward the error request
    next(error);
});

// handle all passed errors
// or anyother error thrown
app.use((error, req, resp ,next) => {
    resp.status(error.status || 500);
    console.log(error.message);
    resp.json({
        error: {
            message: error.message
        }
    });
});


//export function
module.exports = app;