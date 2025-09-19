import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { toast } from 'react-toastify';
import './Profile.css';

const Profile = () => {
  const { user, updateUser } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    country: ''
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        address: user.address || '',
        city: user.city || '',
        country: user.country || ''
      });
    }
    loadOrders();
  }, [user]);

  const loadOrders = async () => {
    try {
      // Simulate loading orders from localStorage
      await new Promise(resolve => setTimeout(resolve, 1000));
      const savedOrders = JSON.parse(localStorage.getItem('orders') || '[]');
      // Filter orders for current user
      const userOrders = savedOrders.filter(order => order.email === user?.email);
      setOrders(userOrders);
    } catch (error) {
      console.error('Error loading orders:', error);
      toast.error('Failed to load order history');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUser(formData);
      toast.success('Profile updated successfully!');
    } catch (error) {
      toast.error('Failed to update profile');
    }
  };

  if (!user) {
    return (
      <div className="profile-container">
        <div className="not-authenticated">
          <h2>Please log in to view your profile</h2>
          <p>You need to be logged in to access your profile and order history.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h1>My Account</h1>
        <p>Welcome back, {user.name}!</p>
      </div>

      <div className="profile-nav">
        <button 
          className={activeTab === 'profile' ? 'active' : ''}
          onClick={() => setActiveTab('profile')}
        >
          👤 Profile
        </button>
        <button 
          className={activeTab === 'orders' ? 'active' : ''}
          onClick={() => setActiveTab('orders')}
        >
          📦 Order History
        </button>
        <button 
          className={activeTab === 'addresses' ? 'active' : ''}
          onClick={() => setActiveTab('addresses')}
        >
          📍 Addresses
        </button>
      </div>

      <div className="profile-content">
        {activeTab === 'profile' && (
          <div className="profile-section">
            <h2>Personal Information</h2>
            <form onSubmit={handleSubmit} className="profile-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    disabled
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+1234567890"
                />
              </div>

              <div className="form-actions">
                <button type="submit" className="btn-primary">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="orders-section">
            <h2>Order History</h2>
            {loading ? (
              <div className="loading">Loading orders...</div>
            ) : orders.length === 0 ? (
              <div className="no-orders">
                <h3>No orders yet</h3>
                <p>You haven't placed any orders yet. Start shopping to see your order history here.</p>
                <a href="/products" className="btn-primary">
                  Start Shopping
                </a>
              </div>
            ) : (
              <div className="orders-list">
                {orders.map((order) => (
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

                    <div className="order-items">
                      {order.items.slice(0, 3).map((item) => (
                        <div key={item._id} className="order-item">
                          <img src={item.image} alt={item.name} />
                          <div className="item-info">
                            <h4>{item.name}</h4>
                            <p>Qty: {item.quantity} × ${item.price}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="order-footer">
                      <div className="order-total">
                        Total: ${order.total.toFixed(2)}
                      </div>
                      <button className="btn-secondary">
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'addresses' && (
          <div className="addresses-section">
            <h2>Shipping Addresses</h2>
            <div className="addresses-list">
              <div className="address-card">
                <h3>Default Shipping Address</h3>
                {user.address ? (
                  <>
                    <p>{user.address}</p>
                    <p>{user.city}, {user.country}</p>
                    <div className="address-actions">
                      <button className="btn-primary">Edit Address</button>
                    </div>
                  </>
                ) : (
                  <div className="no-address">
                    <p>No shipping address added yet</p>
                    <button className="btn-primary">Add Address</button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;