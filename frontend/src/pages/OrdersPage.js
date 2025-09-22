import React from 'react';
import OrderList from '../components/orders/OrderList';
import './Page.css';

const OrdersPage = () => {
  return (
    <div className="page">
      <div className="container">
        <div className="page-header">
          <h1>Your Orders</h1>
          <p>View your order history and track shipments</p>
        </div>
        <OrderList />
      </div>
    </div>
  );
};

export default OrdersPage;