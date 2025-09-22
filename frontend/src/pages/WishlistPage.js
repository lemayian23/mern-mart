import React from 'react';
import Wishlist from '../components/wishlist/Wishlist';
import './Page.css';

const WishlistPage = () => {
  return (
    <div className="page">
      <div className="container">
        <div className="page-header">
          <h1>Your Wishlist</h1>
          <p>Your favorite items saved for later</p>
        </div>
        <Wishlist />
      </div>
    </div>
  );
};

export default WishlistPage;