import React, { useState, useEffect } from 'react';
import { orderService } from '../../services/orderService';
import { Link } from 'react-router-dom';
import './Order.css';

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const orderData = await orderService.getOrders();
      setOrders(orderData);
    } catch (error) {
      setError('Failed to load orders');
      console.error('Failed to fetch orders:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading your orders...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="order-list">
      {orders.length === 0 ? (
        <div className="empty-state">
          <h3>No orders yet</h3>
          <p>Your order history will appear here</p>
          <Link to="/products" className="btn-primary">
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="orders-grid">
          {orders.map(order => (
            <div key={order._id} className="order-card">
              <div className="order-header">
                <h3>Order #{order.orderNumber || order._id}</h3>
                <span className={`status status-${order.status}`}>
                  {order.status}
                </span>
              </div>
              
              <div className="order-details">
                <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
                <p><strong>Total:</strong> ${order.total.toFixed(2)}</p>
                <p><strong>Items:</strong> {order.items.length}</p>
                <p><strong>Payment Status:</strong> 
                  <span className={`payment-status payment-${order.paymentStatus}`}>
                    {order.paymentStatus}
                  </span>
                </p>
              </div>

              <div className="order-actions">
                <Link to={`/orders/${order._id}`} className="btn-primary">
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderList;