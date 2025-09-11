import React from 'react';
import { useCart } from '../../hooks/useCart';

const CartButton = ({ product }) => {
  const { addToCart, isInCart, getCartItemCount } = useCart();
  const cartCount = getCartItemCount();

  const handleAddToCart = () => {
    addToCart(product, 1);
    alert(`Added ${product.name} to cart!`);
  };

  return (
    <div>
      <button 
        onClick={handleAddToCart}
        disabled={isInCart(product._id)}
        style={{
          padding: '10px 20px',
          background: isInCart(product._id) ? '#ccc' : '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: isInCart(product._id) ? 'not-allowed' : 'pointer'
        }}
      >
        {isInCart(product._id) ? 'In Cart' : 'Add to Cart'}
      </button>
      <div style={{ marginTop: '10px' }}>
        Cart Total: {cartCount} items
      </div>
    </div>
  );
};

export default CartButton;