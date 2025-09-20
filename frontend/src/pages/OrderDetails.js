import React, { useState, useEffect } from 'react';
import { orderService } from '../../services/orderService';
import OrderTracking from './OrderTracking';

const OrderDetails = ({ orderId }) => {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const orderData = await orderService.getOrderById(orderId);
        setOrder(orderData);
      } catch (error) {
        console.error('Failed to fetch order details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  if (loading) return <div>Loading order details...</div>;
  if (!order) return <div>Order not found</div>;

  return (
    <div className="order-details">
      <h2>Order #{order.id}</h2>
      <div className="order-info">
        <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
        <p><strong>Status:</strong> <span className={`status status-${order.status}`}>{order.status}</span></p>
        <p><strong>Total:</strong> ${order.total.toFixed(2)}</p>
      </div>
      
      <div className="order-items">
        <h3>Items</h3>
        {order.items.map(item => (
          <div key={item.id} className="order-item">
            <img src={item.product.image} alt={item.product.name} />
            <div>
              <h4>{item.product.name}</h4>
              <p>Quantity: {item.quantity}</p>
              <p>Price: ${item.price.toFixed(2)}</p>
            </div>
          </div>
        ))}
      </div>
      
      <OrderTracking status={order.status} />
      
      <div className="order-address">
        <h3>Shipping Address</h3>
        <p>{order.shippingAddress.name}</p>
        <p>{order.shippingAddress.street}</p>
        <p>{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}</p>
      </div>
    </div>
  );
};

export default OrderDetails;