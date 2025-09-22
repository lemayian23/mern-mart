import React from 'react';
import { Link } from 'react-router-dom';
import './Profile.css';

const Profile = () => {
  return (
    <div className="profile-page">
      <div className="container">
        <div className="profile-header">
          <h1>Your Account</h1>
          <p>Manage your account settings and preferences</p>
        </div>

        <div className="profile-sections">
          <div className="profile-section">
            <h3>Order Management</h3>
            <Link to="/orders" className="profile-link">
              View Order History
            </Link>
            <p>Track your orders and view past purchases</p>
          </div>

          <div className="profile-section">
            <h3>Wishlist</h3>
            <Link to="/wishlist" className="profile-link">
              Manage Wishlist
            </Link>
            <p>View and organize your saved items</p>
          </div>

          <div className="profile-section">
            <h3>Address Book</h3>
            <Link to="/addresses" className="profile-link">
              Manage Addresses
            </Link>
            <p>Add or edit your shipping addresses</p>
          </div>

          <div className="profile-section">
            <h3>Payment Methods</h3>
            <Link to="/payment-methods" className="profile-link">
              Manage Payment Methods
            </Link>
            <p>Add or update your payment options</p>
          </div>

          <div className="profile-section">
            <h3>Account Settings</h3>
            <div className="profile-link">Edit Profile Information</div>
            <div className="profile-link">Change Password</div>
            <div className="profile-link">Notification Preferences</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;