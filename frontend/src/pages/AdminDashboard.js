import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import AdminProducts from '../components/admin/AdminProducts';
import AdminOrders from '../components/admin/AdminOrders';
import AdminUsers from '../components/admin/AdminUsers';
import '../styles/AdminDashboard.css';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('products');
  const { user } = useAuth();

  // Check if user is admin
  if (!user || !user.isAdmin) {
    return (
      <div className="admin-error">
        <h2>Access Denied</h2>
        <p>You need administrator privileges to access this page.</p>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <h1>Admin Dashboard</h1>
        <p>Manage your store efficiently</p>
      </div>

      <div className="admin-nav">
        <button 
          className={activeTab === 'products' ? 'active' : ''}
          onClick={() => setActiveTab('products')}
        >
          📦 Products
        </button>
        <button 
          className={activeTab === 'orders' ? 'active' : ''}
          onClick={() => setActiveTab('orders')}
        >
          📋 Orders
        </button>
        <button 
          className={activeTab === 'users' ? 'active' : ''}
          onClick={() => setActiveTab('users')}
        >
          👥 Users
        </button>
        <button 
          className={activeTab === 'analytics' ? 'active' : ''}
          onClick={() => setActiveTab('analytics')}
        >
          📊 Analytics
        </button>
      </div>

      <div className="admin-content">
        {activeTab === 'products' && <AdminProducts />}
        {activeTab === 'orders' && <AdminOrders />}
        {activeTab === 'users' && <AdminUsers />}
        {activeTab === 'analytics' && (
          <div className="analytics-placeholder">
            <h3>Analytics Dashboard</h3>
            <p>Sales analytics and reports will be displayed here.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;