import React, { useState, useEffect } from 'react';
import { orderService } from '../../services/orderService';
import socketService from '../../services/socketService';
import { useAuth } from '../../context/AuthContext';
import './AdminOrdersPanel.css';

const AdminOrdersPanel = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    fetchOrders();
    setupWebSocket();
  }, []);

  const fetchOrders = async () => {
    try {
      const ordersData = await orderService.getOrders();
      setOrders(ordersData);
    } catch (error) {
      console.error('Failed to fetch orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const setupWebSocket = () => {
    if (user) {
      const token = localStorage.getItem('token');
      const socket = socketService.connect(token);
      
      // Join admin room for all order updates
      socketService.joinAdminRoom();

      // Listen for order updates
      socketService.onOrderUpdated((data) => {
        setOrders(prevOrders => 
          prevOrders.map(order => 
            order._id === data.orderId 
              ? { ...order, status: data.status }
              : order
          )
        );
      });

      // Listen for new orders
      socketService.onNewOrder((data) => {
        // Refresh orders list when new order comes in
        fetchOrders();
      });
    }
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      await orderService.updateOrderStatus(orderId, newStatus);
      // The WebSocket will handle the real-time update
    } catch (error) {
      console.error('Failed to update order status:', error);
    }
  };

  if (loading) return <div className="loading">Loading orders...</div>;

  return (
    <div className="admin-orders-panel">
      <h2>Order Management</h2>
      <div className="orders-grid">
        {orders.map(order => (
          <div key={order._id} className="order-card">
            <div className="order-header">
              <h3>Order #{order.orderNumber}</h3>
              <span className={`status status-${order.status}`}>{order.status}</span>
            </div>
            
            <div className="order-info">
              <p><strong>Customer:</strong> {order.user?.name}</p>
              <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
              <p><strong>Total:</strong> ${order.total.toFixed(2)}</p>
              <p><strong>Items:</strong> {order.items.length}</p>
            </div>

            <div className="order-actions">
              <select 
                value={order.status} 
                onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                className="status-select"
              >
                <option value="processing">Processing</option>
                <option value="shipped">Shipped</option>
                <option value="out-for-delivery">Out for Delivery</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
              
              <button 
                onClick={() => setSelectedOrder(order)}
                className="btn-secondary"
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Order Details - #{selectedOrder.orderNumber}</h3>
            {/* Add detailed order view here */}
            <button 
              onClick={() => setSelectedOrder(null)}
              className="btn-primary"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminOrdersPanel;