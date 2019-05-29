const express = require('express');
const router = express.Router();

const order_controller = require('../controllers/order.controller');

router.get('/test', order_controller.test);
router.post('/', order_controller.order_create);
router.get('/', order_controller.order_list);

module.exports = router;