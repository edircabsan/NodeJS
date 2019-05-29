const Order = require('../models/order.model');

exports.test = function(req, res) {
    res.send('Greetings from the Test controller');
}

exports.order_create = function(req, res){
    let order = new Order({
        date: req.body.date,
        totalPrice: req.body.totalPrice,
        customerDocument: req.body.customerDocument,
        products: []
    });

    console.log(req.body);
    for(let p in req.body.products) {
        let product = req.body.products[p];
        if(product['id'] !== ''){
            let productObject = {id: product['id'], unitValue: product['unitValue'], quantity: product['quantity']};
            order.products.push(productObject);
        }
    }

    order.save(function(err){
        if(err){
            console.log(err);
            return next(err);
        }
        res.send('Order Created Successfully');
    })
}

exports.order_list = function(req, res){
    Order.find(function(err, results){
        if(err){
            return next(err);
        }
        
        res.send(results);
    })
}