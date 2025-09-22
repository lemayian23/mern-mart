const mongoose = require('mongoose');

const paymentMethodSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    enum: ['credit_card', 'paypal', 'bank_transfer'],
    required: true
  },
  // Credit card fields
  last4Digits: String,
  expiryMonth: String,
  expiryYear: String,
  cardholderName: String,
  brand: String, // Visa, Mastercard, etc.
  
  // PayPal fields
  email: String,
  
  // Bank transfer fields
  bankName: String,
  accountType: {
    type: String,
    enum: ['checking', 'savings']
  },
  routingNumber: String,
  
  // Common fields
  isDefault: {
    type: Boolean,
    default: false
  },
  isActive: {
    type: Boolean,
    default: true
  },
  // Store payment provider token (for security, we don't store full card details)
  providerToken: String,
  providerCustomerId: String
}, {
  timestamps: true
});

// Ensure only one default payment method per user
paymentMethodSchema.pre('save', async function(next) {
  if (this.isDefault) {
    await this.constructor.updateMany(
      { user: this.user, _id: { $ne: this._id } },
      { isDefault: false }
    );
  }
  next();
});

module.exports = mongoose.model('PaymentMethod', paymentMethodSchema);