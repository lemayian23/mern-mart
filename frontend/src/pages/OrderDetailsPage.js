import React from 'react';
import { useParams } from 'react-router-dom';
import OrderDetails from '../components/orders/OrderDetails';
import './Page.css';

const OrderDetailsPage = () => {
  const { id } = useParams();

  return (
    <div className="page">
      <div className="container">
        <OrderDetails orderId={id} />
      </div>
    </div>
  );
};

export default OrderDetailsPage;