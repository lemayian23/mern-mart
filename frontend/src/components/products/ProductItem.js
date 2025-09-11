import React from 'react';
import './ProductItem.css';

const ProductItem = ({ product, onAddToCart }) => {
  const handleAddToCart = () => {
    onAddToCart(product);
  };

  return (
    <div className="product-item">
      <div className="product-item-image">
        <img 
          src={product.image || '/api/placeholder/200/200'} 
          alt={product.name}
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/200x200?text=No+Image';
          }}
        />
      </div>
      
      <div className="product-item-content">
        <h4 className="product-item-name">{product.name}</h4>
        <p className="product-item-price">${product.price}</p>
        
        <div className="product-item-meta">
          <span className="product-item-category">{product.category}</span>
          {product.inStock && (
            <span className="product-item-stock">✓ In Stock</span>
          )}
        </div>
        
        <button 
          className="product-item-add-btn"
          onClick={handleAddToCart}
          disabled={!product.inStock}
        >
          {product.inStock ? 'Add to Cart' : 'Out of Stock'}
        </button>
      </div>
    </div>
  );
};

export default ProductItem;