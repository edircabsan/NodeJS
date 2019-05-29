const express = require('express');
const bodyParser = require('body-parser');

const app = express();

//MongoDB
const mongoose = require('mongoose');
let dev_db_url = 'mongodb://localhost:27017/react-node-mongo';
let mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

//BodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//Routes - Precisa ficar após a definição do BodyParser
const product = require('./routes/product.route');
const order = require('./routes/order.route');
app.use('/products', product);
app.use('/orders', order);

let port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log('Message RESTful API server started on: ' + port);
});
