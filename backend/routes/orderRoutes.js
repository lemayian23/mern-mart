const express = require('express');
const { getUserOrders, getOrderById, createOrder, updateOrderStatus } = require('../controllers/orderController');
const auth = require('../middleware/authMiddleware');

const router = express.Router();

router.use(auth);

router.get('/', getUserOrders);
router.get('/:id', getOrderById);
router.post('/', createOrder);
router.patch('/:id/status', updateOrderStatus);

module.exports = router;