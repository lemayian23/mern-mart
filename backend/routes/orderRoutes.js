const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const { asyncHandler } = require('../middleware/errorHandler');
const orderController = require('../controllers/orderController');

router.get('/', auth, asyncHandler(orderController.getOrders));
router.get('/:id', auth, asyncHandler(orderController.getOrder));
router.post('/', auth, asyncHandler(orderController.createOrder));
router.put('/:id', auth, asyncHandler(orderController.updateOrder));
router.delete('/:id', auth, asyncHandler(orderController.deleteOrder));

module.exports = router;