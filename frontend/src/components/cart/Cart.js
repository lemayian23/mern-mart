import React from 'react';
import { useCart } from '../../context/CartContext';
import CartItem from './CartItem';
import './Cart.css';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart, getCartTotal } = useCart();

  if (cartItems.length === 0) {
    return null; // Handled by CartPage
  }

  return (
    <div className="cart">
      <div className="cart-header">
        <h2>Cart Items</h2>
        <button 
          className="clear-cart-btn"
          onClick={clearCart}
        >
          Clear Cart
        </button>
      </div>

      <div className="cart-items">
        {cartItems.map((item) => (
          <CartItem
            key={item._id}
            item={item}
            onRemove={() => removeFromCart(item._id)}
            onUpdateQuantity={(quantity) => updateQuantity(item._id, quantity)}
          />
        ))}
      </div>

      <div className="cart-footer">
        <div className="cart-total">
          <span>Subtotal:</span>
          <span>${getCartTotal()}</span>
        </div>
      </div>
    </div>
  );
};

export default Cart;