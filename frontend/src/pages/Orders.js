import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Orders.css';

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Load orders from localStorage
    const savedOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    setOrders(savedOrders);
  }, []);

  if (orders.length === 0) {
    return (
      <div className="orders-container">
        <h2>Order History</h2>
        <div className="empty-orders">
          <p>You haven't placed any orders yet.</p>
          <Link to="/products" className="btn-primary">
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="orders-container">
      <h2>Order History</h2>
      
      <div className="orders-list">
        {orders.map(order => (
          <div key={order.id} className="order-card">
            <div className="order-header">
              <div>
                <h3>Order #{order.id}</h3>
                <p className="order-date">
                  {new Date(order.date).toLocaleDateString()}
                </p>
              </div>
              <div className="order-status">
                <span className="status-badge">{order.status}</span>
              </div>
            </div>

            <div className="order-items-preview">
              {order.items.slice(0, 3).map(item => (
                <img
                  key={item._id}
                  src={item.image}
                  alt={item.name}
                  className="item-thumbnail"
                />
              ))}
              {order.items.length > 3 && (
                <div className="more-items">+{order.items.length - 3} more</div>
              )}
            </div>

            <div className="order-footer">
              <div className="order-total">
                Total: ${order.total.toFixed(2)}
              </div>
              <Link
                to={`/order/${order.id}`}
                className="view-order-btn"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;