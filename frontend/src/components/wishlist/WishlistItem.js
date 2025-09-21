import React from 'react';
import { Link } from 'react-router-dom';
import './Wishlist.css';

const WishlistItem = ({ item, onRemove, onMoveToCart }) => {
  const { product } = item;

  return (
    <div className="wishlist-item">
      <div className="wishlist-item-image">
        <Link to={`/product/${product._id}`}>
          <img src={product.image} alt={product.name} />
        </Link>
      </div>
      
      <div className="wishlist-item-details">
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
      
      <div className="wishlist-item-actions">
        <button
          className="btn-primary"
          onClick={() => onMoveToCart(product._id)}
          disabled={!product.inStock}
        >
          {product.inStock ? 'Add to Cart' : 'Out of Stock'}
        </button>
        
        <button
          className="btn-remove"
          onClick={() => onRemove(product._id)}
          aria-label="Remove from wishlist"
        >
          ❌
        </button>
      </div>
    </div>
  );
};

export default WishlistItem;