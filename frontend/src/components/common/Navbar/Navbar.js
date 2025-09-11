import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';
import { useCart } from '../../../hooks/useCart';
import { toast } from 'react-toastify';
import AuthModal from '../../auth/AuthModal';
import './Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const { user, logout, isAuthenticated } = useAuth();
  const { getCartItemCount } = useCart();
  const navigate = useNavigate();

  const cartItemCount = getCartItemCount();

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    setIsMenuOpen(false);
  };

  const openAuthModal = () => {
    setIsAuthModalOpen(true);
    setIsMenuOpen(false);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  const closeMobileMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <Link to="/" className="navbar-brand" onClick={closeMobileMenu}>
          <div className="logo-wrapper">
            <span className="logo-icon">🛍️</span>
            <span className="logo-text">MERN Mart</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="navbar-menu">
          <Link to="/products" className="nav-item" onClick={closeMobileMenu}>
            <span className="nav-icon">📦</span>
            <span className="nav-label">Products</span>
          </Link>
          
          <Link to="/about" className="nav-item" onClick={closeMobileMenu}>
            <span className="nav-icon">ℹ️</span>
            <span className="nav-label">About</span>
          </Link>
          
          <Link to="/contact" className="nav-item" onClick={closeMobileMenu}>
            <span className="nav-icon">📞</span>
            <span className="nav-label">Contact</span>
          </Link>

          {/* User Section */}
          <div className="navbar-user-section">
            {isAuthenticated ? (
              <div className="user-menu">
                <div className="user-info">
                  <span className="user-avatar">👤</span>
                  <span className="user-name">Hello, {user?.name}</span>
                </div>
                <div className="user-dropdown">
                  <Link to="/profile" className="dropdown-item" onClick={closeMobileMenu}>
                    <span className="dropdown-icon">⚙️</span>
                    Profile
                  </Link>
                  <button onClick={handleLogout} className="dropdown-item">
                    <span className="dropdown-icon">🚪</span>
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <button onClick={openAuthModal} className="auth-btn login-btn">
                <span className="btn-icon">🔐</span>
                Login
              </button>
            )}

            {/* Cart */}
            <Link to="/cart" className="cart-link" onClick={closeMobileMenu}>
              <div className="cart-wrapper">
                <span className="cart-icon">🛒</span>
                {cartItemCount > 0 && (
                  <span className="cart-badge">{cartItemCount}</span>
                )}
                <span className="cart-label">Cart</span>
              </div>
            </Link>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="mobile-menu-toggle"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`hamburger ${isMenuOpen ? 'active' : ''}`}></span>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="mobile-menu-overlay" onClick={() => setIsMenuOpen(false)}></div>
      )}

      {/* Mobile Menu */}
      <div className={`mobile-menu ${isMenuOpen ? 'active' : ''}`}>
        <div className="mobile-menu-header">
          <span className="mobile-menu-title">Menu</span>
          <button 
            className="mobile-menu-close"
            onClick={() => setIsMenuOpen(false)}
            aria-label="Close menu"
          >
            ✕
          </button>
        </div>

        <div className="mobile-nav-items">
          <Link to="/products" className="mobile-nav-item" onClick={closeMobileMenu}>
            <span className="nav-icon">📦</span>
            <span className="nav-label">Products</span>
          </Link>
          
          <Link to="/about" className="mobile-nav-item" onClick={closeMobileMenu}>
            <span className="nav-icon">ℹ️</span>
            <span className="nav-label">About</span>
          </Link>
          
          <Link to="/contact" className="mobile-nav-item" onClick={closeMobileMenu}>
            <span className="nav-icon">📞</span>
            <span className="nav-label">Contact</span>
          </Link>

          {isAuthenticated ? (
            <>
              <Link to="/profile" className="mobile-nav-item" onClick={closeMobileMenu}>
                <span className="nav-icon">⚙️</span>
                <span className="nav-label">Profile</span>
              </Link>
              <button onClick={handleLogout} className="mobile-nav-item logout-btn">
                <span className="nav-icon">🚪</span>
                <span className="nav-label">Logout</span>
              </button>
            </>
          ) : (
            <button onClick={openAuthModal} className="mobile-nav-item login-btn">
              <span className="nav-icon">🔐</span>
              <span className="nav-label">Login / Register</span>
            </button>
          )}

          <Link to="/cart" className="mobile-nav-item cart-item" onClick={closeMobileMenu}>
            <span className="nav-icon">🛒</span>
            <span className="nav-label">Cart ({cartItemCount})</span>
          </Link>
        </div>

        {isAuthenticated && (
          <div className="mobile-user-info">
            <span className="user-avatar">👤</span>
            <span className="user-name">{user?.name}</span>
          </div>
        )}
      </div>

      <AuthModal isOpen={isAuthModalOpen} onClose={closeAuthModal} />
    </nav>
  );
};

export default Navbar;