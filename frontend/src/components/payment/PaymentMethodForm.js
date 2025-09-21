import React, { useState } from 'react';
import { paymentService } from '../../services/paymentService';
import './Payment.css';

const PaymentMethodForm = ({ method, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    type: method?.type || 'credit_card',
    cardNumber: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: '',
    cardholderName: '',
    email: method?.email || '',
    bankName: '',
    accountNumber: '',
    routingNumber: '',
    accountType: 'checking',
    isDefault: method?.isDefault || false
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    try {
      if (method && method._id) {
        await paymentService.updatePaymentMethod(method._id, formData);
      } else {
        await paymentService.createPaymentMethod(formData);
      }
      onSave();
    } catch (error) {
      console.error('Failed to save payment method:', error);
      setErrors({ submit: error.message || 'Failed to save payment method' });
    } finally {
      setLoading(false);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (formData.type === 'credit_card') {
      if (!formData.cardNumber.replace(/\s/g, '').match(/^\d{16}$/)) {
        newErrors.cardNumber = 'Invalid card number';
      }
      if (!formData.expiryMonth.match(/^(0[1-9]|1[0-2])$/)) {
        newErrors.expiryMonth = 'Invalid month';
      }
      if (!formData.expiryYear.match(/^\d{2}$/)) {
        newErrors.expiryYear = 'Invalid year';
      }
      if (!formData.cvv.match(/^\d{3,4}$/)) {
        newErrors.cvv = 'Invalid CVV';
      }
      if (!formData.cardholderName.trim()) {
        newErrors.cardholderName = 'Cardholder name is required';
      }
    }
    
    if (formData.type === 'paypal' && !formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      newErrors.email = 'Invalid email address';
    }
    
    if (formData.type === 'bank_transfer') {
      if (!formData.bankName.trim()) {
        newErrors.bankName = 'Bank name is required';
      }
      if (!formData.accountNumber.match(/^\d{8,17}$/)) {
        newErrors.accountNumber = 'Invalid account number';
      }
      if (!formData.routingNumber.match(/^\d{9}$/)) {
        newErrors.routingNumber = 'Invalid routing number';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches ? matches[0] : '';
    const parts = [];
    
    for (let i = 0; i < match.length; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    
    return parts.length ? parts.join(' ') : value;
  };

  const handleCardNumberChange = (e) => {
    const formatted = formatCardNumber(e.target.value);
    setFormData(prev => ({ ...prev, cardNumber: formatted }));
  };

  return (
    <div className="payment-form-modal">
      <div className="payment-form-content">
        <h2>{method ? 'Edit Payment Method' : 'Add Payment Method'}</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Payment Method Type *</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              disabled={!!method}
            >
              <option value="credit_card">Credit/Debit Card</option>
              <option value="paypal">PayPal</option>
              <option value="bank_transfer">Bank Transfer</option>
            </select>
          </div>

          {formData.type === 'credit_card' && (
            <>
              <div className="form-group">
                <label>Card Number *</label>
                <input
                  type="text"
                  name="cardNumber"
                  value={formData.cardNumber}
                  onChange={handleCardNumberChange}
                  placeholder="1234 5678 9012 3456"
                  maxLength="19"
                  className={errors.cardNumber ? 'error' : ''}
                />
                {errors.cardNumber && <span className="error-text">{errors.cardNumber}</span>}
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Expiry Month *</label>
                  <input
                    type="text"
                    name="expiryMonth"
                    value={formData.expiryMonth}
                    onChange={handleChange}
                    placeholder="MM"
                    maxLength="2"
                    className={errors.expiryMonth ? 'error' : ''}
                  />
                  {errors.expiryMonth && <span className="error-text">{errors.expiryMonth}</span>}
                </div>

                <div className="form-group">
                  <label>Expiry Year *</label>
                  <input
                    type="text"
                    name="expiryYear"
                    value={formData.expiryYear}
                    onChange={handleChange}
                    placeholder="YY"
                    maxLength="2"
                    className={errors.expiryYear ? 'error' : ''}
                  />
                  {errors.expiryYear && <span className="error-text">{errors.expiryYear}</span>}
                </div>

                <div className="form-group">
                  <label>CVV *</label>
                  <input
                    type="text"
                    name="cvv"
                    value={formData.cvv}
                    onChange={handleChange}
                    placeholder="123"
                    maxLength="4"
                    className={errors.cvv ? 'error' : ''}
                  />
                  {errors.cvv && <span className="error-text">{errors.cvv}</span>}
                </div>
              </div>

              <div className="form-group">
                <label>Cardholder Name *</label>
                <input
                  type="text"
                  name="cardholderName"
                  value={formData.cardholderName}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className={errors.cardholderName ? 'error' : ''}
                />
                {errors.cardholderName && <span className="error-text">{errors.cardholderName}</span>}
              </div>
            </>
          )}

          {formData.type === 'paypal' && (
            <div className="form-group">
              <label>PayPal Email *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your.email@example.com"
                className={errors.email ? 'error' : ''}
              />
              {errors.email && <span className="error-text">{errors.email}</span>}
            </div>
          )}

          {formData.type === 'bank_transfer' && (
            <>
              <div className="form-group">
                <label>Bank Name *</label>
                <input
                  type="text"
                  name="bankName"
                  value={formData.bankName}
                  onChange={handleChange}
                  placeholder="Bank of America"
                  className={errors.bankName ? 'error' : ''}
                />
                {errors.bankName && <span className="error-text">{errors.bankName}</span>}
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Account Number *</label>
                  <input
                    type="text"
                    name="accountNumber"
                    value={formData.accountNumber}
                    onChange={handleChange}
                    placeholder="000123456789"
                    className={errors.accountNumber ? 'error' : ''}
                  />
                  {errors.accountNumber && <span className="error-text">{errors.accountNumber}</span>}
                </div>

                <div className="form-group">
                  <label>Routing Number *</label>
                  <input
                    type="text"
                    name="routingNumber"
                    value={formData.routingNumber}
                    onChange={handleChange}
                    placeholder="123456789"
                    className={errors.routingNumber ? 'error' : ''}
                  />
                  {errors.routingNumber && <span className="error-text">{errors.routingNumber}</span>}
                </div>
              </div>

              <div className="form-group">
                <label>Account Type *</label>
                <select
                  name="accountType"
                  value={formData.accountType}
                  onChange={handleChange}
                >
                  <option value="checking">Checking</option>
                  <option value="savings">Savings</option>
                </select>
              </div>
            </>
          )}

          <div className="form-group checkbox">
            <label>
              <input
                type="checkbox"
                name="isDefault"
                checked={formData.isDefault}
                onChange={handleChange}
              />
              Set as default payment method
            </label>
          </div>

          {errors.submit && <div className="error-message">{errors.submit}</div>}

          <div className="form-actions">
            <button 
              type="submit" 
              className="btn-primary"
              disabled={loading}
            >
              {loading ? 'Saving...' : 'Save Payment Method'}
            </button>
            <button 
              type="button" 
              className="btn-secondary"
              onClick={onCancel}
              disabled={loading}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PaymentMethodForm;