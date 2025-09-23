import React from 'react';
import './OrderTracking.css';

const OrderTracking = ({ status }) => {
  const statusSteps = [
    { key: 'processing', label: 'Processing' },
    { key: 'shipped', label: 'Shipped' },
    { key: 'out-for-delivery', label: 'Out for Delivery' },
    { key: 'delivered', label: 'Delivered' }
  ];

  const currentStatusIndex = statusSteps.findIndex(step => step.key === status);

  return (
    <div className="order-tracking-static">
      <h3>Order Progress</h3>
      <div className="tracking-progress-static">
        {statusSteps.map((step, index) => (
          <div key={step.key} className={`tracking-step-static ${index <= currentStatusIndex ? 'completed' : ''}`}>
            <div className="step-dot-static"></div>
            <div className="step-label-static">{step.label}</div>
            {index < statusSteps.length - 1 && <div className="step-connector-static"></div>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderTracking;