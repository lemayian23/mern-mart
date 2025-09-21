import React, { useState, useEffect } from 'react';
import { paymentService } from '../../services/paymentService';
import PaymentMethodForm from './PaymentMethodForm';
import './Payment.css';

const PaymentMethodsList = () => {
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingMethod, setEditingMethod] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchPaymentMethods();
  }, []);

  const fetchPaymentMethods = async () => {
    try {
      const methods = await paymentService.getPaymentMethods();
      setPaymentMethods(methods);
    } catch (error) {
      setError('Failed to load payment methods');
      console.error('Failed to fetch payment methods:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this payment method?')) {
      try {
        await paymentService.deletePaymentMethod(id);
        setPaymentMethods(paymentMethods.filter(method => method._id !== id));
      } catch (error) {
        setError('Failed to delete payment method');
        console.error('Failed to delete payment method:', error);
      }
    }
  };

  const handleSetDefault = async (id) => {
    try {
      await paymentService.setDefaultPaymentMethod(id);
      setPaymentMethods(paymentMethods.map(method => ({
        ...method,
        isDefault: method._id === id
      })));
    } catch (error) {
      setError('Failed to set default payment method');
      console.error('Failed to set default payment method:', error);
    }
  };

  if (loading) return <div className="loading">Loading payment methods...</div>;

  return (
    <div className="payment-methods">
      <div className="payment-header">
        <h2>Your Payment Methods</h2>
        <button 
          className="btn-primary"
          onClick={() => {
            setEditingMethod(null);
            setShowForm(true);
          }}
        >
          Add Payment Method
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}

      {showForm && (
        <PaymentMethodForm
          method={editingMethod}
          onSave={() => {
            setShowForm(false);
            setEditingMethod(null);
            fetchPaymentMethods();
          }}
          onCancel={() => {
            setShowForm(false);
            setEditingMethod(null);
          }}
        />
      )}

      <div className="payment-methods-grid">
        {paymentMethods.map(method => (
          <div key={method._id} className={`payment-method-card ${method.isDefault ? 'default' : ''}`}>
            <div className="payment-method-content">
              <div className="payment-method-header">
                <h3>
                  {method.type === 'credit_card' ? 'Credit Card' : 
                   method.type === 'paypal' ? 'PayPal' : 
                   method.type === 'bank_transfer' ? 'Bank Transfer' : 'Payment Method'}
                  {method.isDefault && <span className="default-badge">Default</span>}
                </h3>
                <div className="payment-method-actions">
                  <button 
                    className="btn-secondary"
                    onClick={() => {
                      setEditingMethod(method);
                      setShowForm(true);
                    }}
                  >
                    Edit
                  </button>
                  <button 
                    className="btn-secondary"
                    onClick={() => handleSetDefault(method._id)}
                    disabled={method.isDefault}
                  >
                    {method.isDefault ? 'Default' : 'Set Default'}
                  </button>
                  <button 
                    className="btn-danger"
                    onClick={() => handleDelete(method._id)}
                    disabled={method.isDefault}
                  >
                    Delete
                  </button>
                </div>
              </div>

              {method.type === 'credit_card' && (
                <div className="credit-card-details">
                  <div className="card-number">
                    **** **** **** {method.last4Digits}
                  </div>
                  <div className="card-info">
                    <span>Expires: {method.expiryMonth}/{method.expiryYear}</span>
                    <span>{method.cardholderName}</span>
                  </div>
                  <div className="card-type">{method.brand}</div>
                </div>
              )}

              {method.type === 'paypal' && (
                <div className="paypal-details">
                  <div className="paypal-email">{method.email}</div>
                  <div className="paypal-status">Connected</div>
                </div>
              )}

              {method.type === 'bank_transfer' && (
                <div className="bank-details">
                  <div className="bank-name">{method.bankName}</div>
                  <div className="account-number">****{method.last4Digits}</div>
                  <div className="account-type">{method.accountType}</div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {paymentMethods.length === 0 && !showForm && (
        <div className="empty-state">
          <h3>No payment methods saved</h3>
          <p>Add your first payment method to get started</p>
          <button 
            className="btn-primary"
            onClick={() => setShowForm(true)}
          >
            Add Payment Method
          </button>
        </div>
      )}
    </div>
  );
};

export default PaymentMethodsList;