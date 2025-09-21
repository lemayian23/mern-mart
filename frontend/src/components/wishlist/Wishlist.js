import React, { useState, useEffect } from 'react';
import { wishlistService } from '../../services/wishlistService';
import WishlistItem from './WishlistItem';
import './Wishlist.css';

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchWishlist();
  }, []);

  const fetchWishlist = async () => {
    try {
      const items = await wishlistService.getWishlist();
      setWishlistItems(items);
    } catch (error) {
      console.error('Failed to fetch wishlist:', error);
      setError('Failed to load your wishlist');
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveItem = async (productId) => {
    try {
      await wishlistService.removeFromWishlist(productId);
      setWishlistItems(wishlistItems.filter(item => item.product._id !== productId));
    } catch (error) {
      console.error('Failed to remove item from wishlist:', error);
      setError('Failed to remove item from wishlist');
    }
  };

  const handleMoveToCart = async (productId) => {
    try {
      // This would call your cart service to add the item
      console.log('Moving product to cart:', productId);
      // After moving to cart, you might want to remove from wishlist
      await handleRemoveItem(productId);
    } catch (error) {
      console.error('Failed to move item to cart:', error);
      setError('Failed to move item to cart');
    }
  };

  if (loading) return <div className="loading">Loading your wishlist...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="wishlist">
      <div className="wishlist-header">
        <h2>Your Wishlist</h2>
        <p className="wishlist-count">
          {wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'}
        </p>
      </div>

      {wishlistItems.length === 0 ? (
        <div className="empty-wishlist">
          <div className="empty-icon">❤️</div>
          <h3>Your wishlist is empty</h3>
          <p>Save your favorite items here for easy access later</p>
          <button className="btn-primary" onClick={() => window.location.href = '/products'}>
            Browse Products
          </button>
        </div>
      ) : (
        <div className="wishlist-items">
          {wishlistItems.map(item => (
            <WishlistItem
              key={item._id}
              item={item}
              onRemove={handleRemoveItem}
              onMoveToCart={handleMoveToCart}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;