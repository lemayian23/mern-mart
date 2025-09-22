import React from 'react';
import PaymentMethodsList from '../components/payments/PaymentMethodsList';
import './PaymentPage.css';

const PaymentMethodsPage = () => {
  return (
    <div className="payment-page">
      <div className="container">
        <div className="payment-page-header">
          <h1>Payment Methods</h1>
          <p>Manage your payment methods and billing information</p>
        </div>
        <PaymentMethodsList />
      </div>
    </div>
  );
};

export default PaymentMethodsPage;