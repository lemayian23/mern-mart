const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const { asyncHandler } = require('../middleware/errorHandler');
const cartController = require('../controllers/cartController');

router.get('/', auth, asyncHandler(cartController.getCart));
router.post('/add', auth, asyncHandler(cartController.addToCart));
router.put('/update/:productId', auth, asyncHandler(cartController.updateCartItem));
router.delete('/remove/:productId', auth, asyncHandler(cartController.removeFromCart));
router.delete('/clear', auth, asyncHandler(cartController.clearCart));

module.exports = router;