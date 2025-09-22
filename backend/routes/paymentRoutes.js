const express = require('express');
const {
  getUserPaymentMethods,
  getPaymentMethodById,
  createPaymentMethod,
  updatePaymentMethod,
  deletePaymentMethod,
  setDefaultPaymentMethod,
  processPayment,
  getPaymentHistory,
  getPaymentById,
  refundPayment
} = require('../controllers/paymentController');
const auth = require('../middleware/auth');

const router = express.Router();

router.use(auth);

// Payment methods routes
router.get('/payment-methods', getUserPaymentMethods);
router.get('/payment-methods/:id', getPaymentMethodById);
router.post('/payment-methods', createPaymentMethod);
router.put('/payment-methods/:id', updatePaymentMethod);
router.delete('/payment-methods/:id', deletePaymentMethod);
router.patch('/payment-methods/:id/default', setDefaultPaymentMethod);

// Payment processing routes
router.post('/payments/process', processPayment);
router.get('/payments/history', getPaymentHistory);
router.get('/payments/:id', getPaymentById);
router.post('/payments/:id/refund', refundPayment);

module.exports = router;