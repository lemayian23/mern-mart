import React from 'react';
import './Order.css';

const OrderTracking = ({ status }) => {
  const statusSteps = [
    { key: 'processing', label: 'Processing' },
    { key: 'shipped', label: 'Shipped' },
    { key: 'out-for-delivery', label: 'Out for Delivery' },
    { key: 'delivered', label: 'Delivered' }
  ];

  const currentStatusIndex = statusSteps.findIndex(step => step.key === status);

  return (
    <div className="order-tracking">
      <h3>Order Status</h3>
      <div className="tracking-progress">
        {statusSteps.map((step, index) => (
          <div key={step.key} className={`tracking-step ${index <= currentStatusIndex ? 'completed' : ''} ${index === currentStatusIndex ? 'current' : ''}`}>
            <div className="step-dot"></div>
            <div className="step-label">{step.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderTracking;