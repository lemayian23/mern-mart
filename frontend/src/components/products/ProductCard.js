import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { wishlistService } from '../../services/wishlistService';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const [inWishlist, setInWishlist] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    checkWishlistStatus();
  }, [product._id]);

  const checkWishlistStatus = async () => {
    try {
      const response = await wishlistService.checkInWishlist(product._id);
      setInWishlist(response.inWishlist);
    } catch (error) {
      console.error('Failed to check wishlist status:', error);
    }
  };

  const handleWishlistToggle = async () => {
    setLoading(true);
    try {
      if (inWishlist) {
        await wishlistService.removeFromWishlist(product._id);
        setInWishlist(false);
      } else {
        await wishlistService.addToWishlist(product._id);
        setInWishlist(true);
      }
    } catch (error) {
      console.error('Failed to update wishlist:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="product-card">
      <div className="product-image">
        <Link to={`/product/${product._id}`}>
          <img src={product.image} alt={product.name} />
        </Link>
        <button
          className={`wishlist-btn ${inWishlist ? 'in-wishlist' : ''}`}
          onClick={handleWishlistToggle}
          disabled={loading}
          aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          {inWishlist ? '❤️' : '🤍'}
        </button>
      </div>
      
      <div className="product-info">
        <Link to={`/product/${product._id}`} className="product-link">
          <h3 className="product-name">{product.name}</h3>
        </Link>
        <p className="product-category">{product.category}</p>
        <p className="product-price">${product.price.toFixed(2)}</p>
        
        {product.inStock ? (
          <span className="stock-status in-stock">In Stock</span>
        ) : (
          <span className="stock-status out-of-stock">Out of Stock</span>
        )}
      </div>
    </div>
  );
};

export default ProductCard;