import React, { useState, useEffect } from 'react';
import socketService from '../../services/socketService';
import { useAuth } from '../../context/AuthContext';
import './RealTimeTracking.css';

const RealTimeTracking = ({ orderId, currentStatus }) => {
  const [status, setStatus] = useState(currentStatus);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [isConnected, setIsConnected] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    setStatus(currentStatus);
  }, [currentStatus]);

  useEffect(() => {
    if (user) {
      // Connect to WebSocket
      const token = localStorage.getItem('token');
      const socket = socketService.connect(token);
      
      // Join user room for order updates
      socketService.joinUserRoom(user._id);

      // Listen for order updates
      socketService.onOrderUpdated((data) => {
        if (data.orderId === orderId) {
          setStatus(data.status);
          setLastUpdated(new Date(data.timestamp));
          
          // Show notification
          if (data.message) {
            console.log('Order update:', data.message);
          }
        }
      });

      socket.on('connect', () => {
        setIsConnected(true);
      });

      socket.on('disconnect', () => {
        setIsConnected(false);
      });

      return () => {
        socketService.removeAllListeners();
      };
    }
  }, [user, orderId]);

  const statusSteps = [
    { key: 'processing', label: 'Processing', description: 'Your order is being prepared' },
    { key: 'shipped', label: 'Shipped', description: 'Your order is on the way' },
    { key: 'out-for-delivery', label: 'Out for Delivery', description: 'Your order will arrive today' },
    { key: 'delivered', label: 'Delivered', description: 'Your order has been delivered' }
  ];

  const currentStatusIndex = statusSteps.findIndex(step => step.key === status);

  return (
    <div className="real-time-tracking">
      <div className="tracking-header">
        <h3>Live Order Tracking</h3>
        <div className="connection-status">
          <span className={`status-dot ${isConnected ? 'connected' : 'disconnected'}`}></span>
          {isConnected ? 'Live updates active' : 'Connecting...'}
        </div>
      </div>

      <div className="tracking-progress">
        {statusSteps.map((step, index) => (
          <div key={step.key} className={`tracking-step ${index <= currentStatusIndex ? 'completed' : ''} ${index === currentStatusIndex ? 'current' : ''}`}>
            <div className="step-marker">
              <div className="step-dot"></div>
              {index < statusSteps.length - 1 && <div className="step-connector"></div>}
            </div>
            <div className="step-info">
              <div className="step-label">{step.label}</div>
              <div className="step-description">{step.description}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="tracking-footer">
        <div className="last-updated">
          Last updated: {lastUpdated.toLocaleString()}
        </div>
        <div className="current-status">
          Current status: <span className={`status-badge status-${status}`}>{status}</span>
        </div>
      </div>
    </div>
  );
};

export default RealTimeTracking;