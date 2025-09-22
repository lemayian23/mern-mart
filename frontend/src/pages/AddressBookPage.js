import React from 'react';
import AddressList from '../components/addresses/AddressList';
import './Page.css';

const AddressBookPage = () => {
  return (
    <div className="page">
      <div className="container">
        <div className="page-header">
          <h1>Address Book</h1>
          <p>Manage your shipping addresses</p>
        </div>
        <AddressList />
      </div>
    </div>
  );
};

export default AddressBookPage;