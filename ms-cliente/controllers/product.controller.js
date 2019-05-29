const Product = require('../models/product.model');

exports.test = function(req, res) {
    res.send('Greetings from the Test controller');
}

exports.product_create = function(req, res){
    let product = new Product({
        name: req.body.name,
        price: req.body.price
    });
    product.save(function(err){
        if(err){
            return next(err);
        }
        res.send('Product Created Successfully');
    })
}

exports.product_list = function(req, res){
    Product.find(function(err, results){
        if(err){
            return next(err);
        }
        res.send(results);
    })
}