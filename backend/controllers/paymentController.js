const PaymentMethod = require('../models/PaymentMethod');
const Payment = require('../models/Payment');
const Order = require('../models/Order');

// Get user's payment methods
exports.getUserPaymentMethods = async (req, res) => {
  try {
    const paymentMethods = await PaymentMethod.find({ 
      user: req.user.id,
      isActive: true 
    }).sort({ isDefault: -1, createdAt: -1 });
    
    res.json(paymentMethods);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get payment method by ID
exports.getPaymentMethodById = async (req, res) => {
  try {
    const paymentMethod = await PaymentMethod.findById(req.params.id);
    
    if (!paymentMethod) {
      return res.status(404).json({ message: 'Payment method not found' });
    }

    if (paymentMethod.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    res.json(paymentMethod);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Create new payment method
exports.createPaymentMethod = async (req, res) => {
  try {
    const { type, isDefault, ...paymentData } = req.body;
    
    // Validate payment method type
    const validTypes = ['credit_card', 'paypal', 'bank_transfer'];
    if (!validTypes.includes(type)) {
      return res.status(400).json({ message: 'Invalid payment method type' });
    }

    // In a real application, you would:
    // 1. Send payment data to payment processor (Stripe, PayPal, etc.)
    // 2. Get a payment method token
    // 3. Store only the token, not sensitive data
    
    // For demo purposes, we'll simulate this
    let paymentMethodData = {
      user: req.user.id,
      type,
      isDefault: isDefault || false
    };

    if (type === 'credit_card') {
      // Validate credit card data
      if (!paymentData.cardNumber || !paymentData.expiryMonth || !paymentData.expiryYear || !paymentData.cvv) {
        return res.status(400).json({ message: 'Missing credit card information' });
      }
      
      // Simulate payment processor tokenization
      paymentMethodData = {
        ...paymentMethodData,
        last4Digits: paymentData.cardNumber.slice(-4),
        expiryMonth: paymentData.expiryMonth,
        expiryYear: paymentData.expiryYear,
        cardholderName: paymentData.cardholderName,
        brand: this.getCardBrand(paymentData.cardNumber),
        providerToken: `tok_${Math.random().toString(36).substr(2, 10)}` // Simulated token
      };
    } else if (type === 'paypal') {
      if (!paymentData.email) {
        return res.status(400).json({ message: 'PayPal email is required' });
      }
      paymentMethodData.email = paymentData.email;
    } else if (type === 'bank_transfer') {
      if (!paymentData.bankName || !paymentData.accountNumber || !paymentData.routingNumber) {
        return res.status(400).json({ message: 'Missing bank account information' });
      }
      paymentMethodData = {
        ...paymentMethodData,
        bankName: paymentData.bankName,
        last4Digits: paymentData.accountNumber.slice(-4),
        routingNumber: paymentData.routingNumber,
        accountType: paymentData.accountType || 'checking'
      };
    }

    const paymentMethod = new PaymentMethod(paymentMethodData);
    const savedPaymentMethod = await paymentMethod.save();
    
    res.status(201).json(savedPaymentMethod);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Helper method to determine card brand
exports.getCardBrand = (cardNumber) => {
  const cleaned = cardNumber.replace(/\s+/g, '');
  
  if (/^4/.test(cleaned)) return 'Visa';
  if (/^5[1-5]/.test(cleaned)) return 'Mastercard';
  if (/^3[47]/.test(cleaned)) return 'American Express';
  if (/^6(?:011|5)/.test(cleaned)) return 'Discover';
  if (/^3(?:0[0-5]|[68])/.test(cleaned)) return 'Diners Club';
  
  return 'Unknown';
};

// Update payment method
exports.updatePaymentMethod = async (req, res) => {
  try {
    const { isDefault, ...updateData } = req.body;
    const paymentMethod = await PaymentMethod.findById(req.params.id);
    
    if (!paymentMethod) {
      return res.status(404).json({ message: 'Payment method not found' });
    }

    if (paymentMethod.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    // Only allow updating certain fields
    const allowedUpdates = ['isDefault', 'cardholderName', 'email', 'bankName', 'accountType'];
    const updates = {};
    
    Object.keys(updateData).forEach(key => {
      if (allowedUpdates.includes(key)) {
        updates[key] = updateData[key];
      }
    });

    if (isDefault !== undefined) {
      updates.isDefault = isDefault;
    }

    const updatedPaymentMethod = await PaymentMethod.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true, runValidators: true }
    );

    res.json(updatedPaymentMethod);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Delete payment method
exports.deletePaymentMethod = async (req, res) => {
  try {
    const paymentMethod = await PaymentMethod.findById(req.params.id);
    
    if (!paymentMethod) {
      return res.status(404).json({ message: 'Payment method not found' });
    }

    if (paymentMethod.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    if (paymentMethod.isDefault) {
      return res.status(400).json({ message: 'Cannot delete default payment method' });
    }

    // Soft delete by marking as inactive
    paymentMethod.isActive = false;
    await paymentMethod.save();

    res.json({ message: 'Payment method deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Set default payment method
exports.setDefaultPaymentMethod = async (req, res) => {
  try {
    const paymentMethod = await PaymentMethod.findById(req.params.id);
    
    if (!paymentMethod) {
      return res.status(404).json({ message: 'Payment method not found' });
    }

    if (paymentMethod.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    // Update all payment methods to not default
    await PaymentMethod.updateMany(
      { user: req.user.id },
      { isDefault: false }
    );

    // Set this payment method as default
    paymentMethod.isDefault = true;
    await paymentMethod.save();

    res.json({ message: 'Default payment method updated successfully', paymentMethod });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Process payment
exports.processPayment = async (req, res) => {
  try {
    const { orderId, paymentMethodId, amount, currency = 'USD' } = req.body;
    
    // Validate required fields
    if (!orderId || !paymentMethodId || !amount) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Verify payment method belongs to user
    const paymentMethod = await PaymentMethod.findOne({
      _id: paymentMethodId,
      user: req.user.id,
      isActive: true
    });

    if (!paymentMethod) {
      return res.status(404).json({ message: 'Payment method not found' });
    }

    // Verify order belongs to user
    const order = await Order.findOne({
      _id: orderId,
      user: req.user.id
    });

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Check if order is already paid
    if (order.status === 'paid') {
      return res.status(400).json({ message: 'Order is already paid' });
    }

    // In a real application, you would:
    // 1. Create payment intent with Stripe/PayPal
    // 2. Confirm the payment
    // 3. Handle webhooks for payment confirmation
    
    // For demo purposes, we'll simulate payment processing
    const payment = new Payment({
      user: req.user.id,
      order: orderId,
      amount,
      currency,
      paymentMethod: paymentMethodId,
      status: 'completed', // Simulate successful payment
      transactionId: `txn_${Math.random().toString(36).substr(2, 14)}`,
      description: `Payment for order #${orderId}`
    });

    const savedPayment = await payment.save();

    // Update order status
    order.status = 'paid';
    order.paymentStatus = 'paid';
    await order.save();

    res.status(201).json({
      message: 'Payment processed successfully',
      payment: savedPayment
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get payment history
exports.getPaymentHistory = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    
    const payments = await Payment.find({ user: req.user.id })
      .populate('order', 'orderNumber total')
      .populate('paymentMethod', 'type last4Digits brand')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Payment.countDocuments({ user: req.user.id });

    res.json({
      payments,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get payment by ID
exports.getPaymentById = async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id)
      .populate('order')
      .populate('paymentMethod');

    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' });
    }

    if (payment.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    res.json(payment);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Refund payment
exports.refundPayment = async (req, res) => {
  try {
    const { refundAmount, reason } = req.body;
    const payment = await Payment.findById(req.params.id);
    
    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' });
    }

    if (payment.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    if (payment.status !== 'completed') {
      return res.status(400).json({ message: 'Only completed payments can be refunded' });
    }

    const refundAmountValue = refundAmount || payment.amount;

    if (refundAmountValue > payment.amount - payment.refundAmount) {
      return res.status(400).json({ message: 'Refund amount exceeds available amount' });
    }

    // In a real application, you would process refund with payment processor
    payment.refundAmount += refundAmountValue;
    payment.refundReason = reason;
    
    if (payment.refundAmount >= payment.amount) {
      payment.status = 'refunded';
    }

    await payment.save();

    res.json({ message: 'Refund processed successfully', payment });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};