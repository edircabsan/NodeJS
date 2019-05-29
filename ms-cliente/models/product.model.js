const mongoose = require('mongoose');
const schema = mongoose.Schema;

let productSchema = new schema({
    name: {type: String, required: true, max: 100},
    price: {type: Number, required: true}
});

module.exports = mongoose.model('product', productSchema);