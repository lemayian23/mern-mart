import React, { useState } from 'react';
import { addressService } from '../../services/addressService';

const AddressForm = ({ address, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: address?.name || '',
    street: address?.street || '',
    city: address?.city || '',
    state: address?.state || '',
    zipCode: address?.zipCode || '',
    isDefault: address?.isDefault || false
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let savedAddress;
      if (address?.id) {
        savedAddress = await addressService.updateAddress(address.id, formData);
      } else {
        savedAddress = await addressService.createAddress(formData);
      }
      onSave(savedAddress);
    } catch (error) {
      console.error('Failed to save address:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="address-form">
      <div className="form-group">
        <label>Address Name (e.g., Home, Work)</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      
      <div className="form-group">
        <label>Street Address</label>
        <input
          type="text"
          name="street"
          value={formData.street}
          onChange={handleChange}
          required
        />
      </div>
      
      <div className="form-group">
        <label>City</label>
        <input
          type="text"
          name="city"
          value={formData.city}
          onChange={handleChange}
          required
        />
      </div>
      
      <div className="form-group">
        <label>State</label>
        <input
          type="text"
          name="state"
          value={formData.state}
          onChange={handleChange}
          required
        />
      </div>
      
      <div className="form-group">
        <label>ZIP Code</label>
        <input
          type="text"
          name="zipCode"
          value={formData.zipCode}
          onChange={handleChange}
          required
        />
      </div>
      
      <div className="form-group checkbox">
        <label>
          <input
            type="checkbox"
            name="isDefault"
            checked={formData.isDefault}
            onChange={handleChange}
          />
          Set as default address
        </label>
      </div>
      
      <div className="form-actions">
        <button type="submit">Save Address</button>
        <button type="button" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
};

export default AddressForm;