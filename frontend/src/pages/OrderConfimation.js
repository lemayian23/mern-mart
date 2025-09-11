import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import './OrderConfirmation.css';

const OrderConfirmation = () => {
  const { state } = useLocation();
  const order = state?.order;

  if (!order) {
    return (
      <div className="confirmation-container">
        <h2>Order Not Found</h2>
        <p>Please check your order history or contact support.</p>
        <Link to="/" className="btn-primary">Return Home</Link>
      </div>
    );
  }

  return (
    <div className="confirmation-container">
      <div className="confirmation-card">
        <div className="confirmation-header">
          <div className="success-icon">✅</div>
          <h1>Order Confirmed!</h1>
          <p>Thank you for your purchase</p>
        </div>

        <div className="order-details">
          <div className="detail-row">
            <span>Order ID:</span>
            <span>{order.id}</span>
          </div>
          <div className="detail-row">
            <span>Order Date:</span>
            <span>{new Date(order.date).toLocaleDateString()}</span>
          </div>
          <div className="detail-row">
            <span>Total Amount:</span>
            <span>${order.total.toFixed(2)}</span>
          </div>
        </div>

        <div className="shipping-info">
          <h3>Shipping Address</h3>
          <p>
            {order.shippingAddress.firstName} {order.shippingAddress.lastName}<br />
            {order.shippingAddress.address}<br />
            {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}<br />
            {order.shippingAddress.country}
          </p>
        </div>

        <div className="order-items">
          <h3>Items Ordered</h3>
          {order.items.map(item => (
            <div key={item._id} className="confirmation-item">
              <img src={item.image} alt={item.name} />
              <div className="item-info">
                <h4>{item.name}</h4>
                <p>Quantity: {item.quantity}</p>
                <p>Price: ${item.price}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="confirmation-actions">
          <Link to="/products" className="btn-primary">
            Continue Shopping
          </Link>
          <Link to="/orders" className="btn-secondary">
            View Order History
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;