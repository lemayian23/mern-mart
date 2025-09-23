import React, { useState, useEffect } from 'react';
import { orderService } from '../../services/orderService';
import RealTimeTracking from './RealTimeTracking'; // New component
import OrderTracking from './OrderTracking'; // Existing component
import './OrderDetails.css';

const OrderDetails = ({ orderId }) => {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const orderData = await orderService.getOrderById(orderId);
        setOrder(orderData);
      } catch (error) {
        setError('Failed to fetch order details');
        console.error('Failed to fetch order details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  if (loading) return <div className="loading">Loading order details...</div>;
  if (error) return <div className="error-message">{error}</div>;
  if (!order) return <div>Order not found</div>;

  return (
    <div className="order-details">
      <h2>Order #{order.orderNumber || order._id}</h2>
      
      <div className="order-info">
        <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
        <p><strong>Status:</strong> <span className={`status status-${order.status}`}>{order.status}</span></p>
        <p><strong>Total:</strong> ${order.total.toFixed(2)}</p>
        <p><strong>Payment Status:</strong> <span className={`payment-status payment-${order.paymentStatus}`}>{order.paymentStatus}</span></p>
      </div>

      {/* Real-time Tracking Component */}
      <RealTimeTracking 
        orderId={order._id} 
        currentStatus={order.status} 
      />

      {/* Existing Static Tracking */}
      <OrderTracking status={order.status} />

      {/* Rest of your existing order details */}
      <div className="order-items">
        <h3>Order Items</h3>
        {order.items.map(item => (
          <div key={item._id} className="order-item">
            <img src={item.product?.image || '/placeholder-image.jpg'} alt={item.product?.name} />
            <div className="order-item-details">
              <h4>{item.product?.name || 'Product'}</h4>
              <p>Quantity: {item.quantity}</p>
              <p>Price: ${item.price.toFixed(2)}</p>
              <p>Subtotal: ${(item.quantity * item.price).toFixed(2)}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="order-address">
        <h3>Shipping Address</h3>
        <p>{order.shippingAddress?.name}</p>
        <p>{order.shippingAddress?.street}</p>
        <p>{order.shippingAddress?.city}, {order.shippingAddress?.state} {order.shippingAddress?.zipCode}</p>
      </div>
    </div>
  );
};

export default OrderDetails;