const mongoose = require('mongoose');
const schema = mongoose.Schema;

let orderSchema = new schema({
    date: {type: Date, required: true},
    totalPrice: {type: Number, required: true},
    customerDocument: {type: String, required: false, maxlength: 11},
    products: [{
        id: {type: String},
        unitValue: {type: Number},
        quantity: {type: Number},
    }]
});

module.exports = mongoose.model('order', orderSchema);