import React, { useState, useEffect } from 'react';
import { addressService } from '../../services/addressService';
import AddressForm from './AddressForm';
import './Address.css';

const AddressList = () => {
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingAddress, setEditingAddress] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchAddresses();
  }, []);

  const fetchAddresses = async () => {
    try {
      const addressData = await addressService.getAddresses();
      setAddresses(addressData);
    } catch (error) {
      console.error('Failed to fetch addresses:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this address?')) {
      try {
        await addressService.deleteAddress(id);
        setAddresses(addresses.filter(address => address._id !== id));
      } catch (error) {
        console.error('Failed to delete address:', error);
      }
    }
  };

  const handleSetDefault = async (id) => {
    try {
      await addressService.setDefaultAddress(id);
      // Update local state to reflect the change
      setAddresses(addresses.map(address => ({
        ...address,
        isDefault: address._id === id
      })));
    } catch (error) {
      console.error('Failed to set default address:', error);
    }
  };

  if (loading) return <div className="loading">Loading addresses...</div>;

  return (
    <div className="address-list">
      <div className="address-header">
        <h2>Your Addresses</h2>
        <button 
          className="btn-primary"
          onClick={() => {
            setEditingAddress(null);
            setShowForm(true);
          }}
        >
          Add New Address
        </button>
      </div>

      {showForm && (
        <AddressForm
          address={editingAddress}
          onSave={() => {
            setShowForm(false);
            setEditingAddress(null);
            fetchAddresses();
          }}
          onCancel={() => {
            setShowForm(false);
            setEditingAddress(null);
          }}
        />
      )}

      <div className="address-grid">
        {addresses.map(address => (
          <div key={address._id} className={`address-card ${address.isDefault ? 'default' : ''}`}>
            <div className="address-content">
              <h3>{address.name} {address.isDefault && <span className="default-badge">Default</span>}</h3>
              <p>{address.street}</p>
              <p>{address.city}, {address.state} {address.zipCode}</p>
              <p>{address.country}</p>
              <p className="phone">{address.phone}</p>
            </div>
            <div className="address-actions">
              <button 
                className="btn-secondary"
                onClick={() => {
                  setEditingAddress(address);
                  setShowForm(true);
                }}
              >
                Edit
              </button>
              <button 
                className="btn-secondary"
                onClick={() => handleSetDefault(address._id)}
                disabled={address.isDefault}
              >
                {address.isDefault ? 'Default' : 'Set Default'}
              </button>
              <button 
                className="btn-danger"
                onClick={() => handleDelete(address._id)}
                disabled={address.isDefault}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {addresses.length === 0 && !showForm && (
        <div className="empty-state">
          <h3>No addresses saved</h3>
          <p>Add your first address to get started</p>
          <button 
            className="btn-primary"
            onClick={() => setShowForm(true)}
          >
            Add Address
          </button>
        </div>
      )}
    </div>
  );
};

export default AddressList;