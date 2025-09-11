import React from 'react';
import { useCart } from '../../hooks/useCart';
import CartButton from '../cart/CartButton';

const ProductCard = ({ product }) => {
  const { isInCart } = useCart();

  return (
    <div className="product-card">
      <div className="product-image">
        <img src={product.image} alt={product.name} />
        {!product.inStock && (
          <div className="out-of-stock">Out of Stock</div>
        )}
      </div>
      
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-description">{product.description}</p>
        <div className="product-price">${product.price}</div>
        <div className="product-category">{product.category}</div>
      </div>
      
      <div className="product-actions">
        <CartButton product={product} />
      </div>
    </div>
  );
};

export default ProductCard;