const express = require('express');
const router = express.Router();

const product_controller = require('../controllers/product.controller');

router.get('/test', product_controller.test);
router.post('/', product_controller.product_create);
router.get('/', product_controller.product_list);

module.exports = router;