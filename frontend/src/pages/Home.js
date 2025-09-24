import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const featuredProducts = [
    {
      id: 1,
      name: "Wireless Headphones",
      price: "$199.99",
      image: "🎧",
      category: "Electronics",
      rating: 4.8
    },
    {
      id: 2,
      name: "Smart Watch",
      price: "$299.99",
      image: "⌚",
      category: "Wearables",
      rating: 4.6
    },
    {
      id: 3,
      name: "Laptop Stand",
      price: "$49.99",
      image: "💻",
      category: "Accessories",
      rating: 4.9
    }
  ];

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            Welcome to <span className="text-gradient">MERN Mart</span>
          </h1>
          <p className="hero-subtitle">
            Discover amazing products with unbeatable prices. 
            Shop with confidence and enjoy fast delivery.
          </p>
          <div className="hero-actions">
            <Link to="/products" className="btn btn-primary btn-lg">
              Shop Now
            </Link>
            <Link to="/deals" className="btn btn-outline btn-lg">
              View Deals
            </Link>
          </div>
        </div>
        <div className="hero-visual">
          <div className="floating-elements">
            <div className="floating-card">🔥 Hot Deals</div>
            <div className="floating-card">🚚 Free Shipping</div>
            <div className="floating-card">⭐ Top Rated</div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="featured-section">
        <div className="section-header">
          <h2>Featured Products</h2>
          <p>Handpicked items just for you</p>
        </div>
        <div className="products-grid grid grid-cols-auto gap-6">
          {featuredProducts.map(product => (
            <div key={product.id} className="product-card card hover-lift">
              <div className="product-image">
                <span className="product-emoji">{product.image}</span>
                <div className="product-badge">New</div>
              </div>
              <div className="product-content">
                <span className="product-category">{product.category}</span>
                <h3 className="product-name">{product.name}</h3>
                <div className="product-rating">
                  {'⭐'.repeat(Math.floor(product.rating))}
                  <span>({product.rating})</span>
                </div>
                <div className="product-footer">
                  <span className="product-price">{product.price}</span>
                  <button className="btn btn-primary btn-sm">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Grid */}
      <section className="features-section">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="feature-card card text-center">
            <div className="feature-icon">🚚</div>
            <h3>Free Shipping</h3>
            <p>Free delivery on orders over $50</p>
          </div>
          <div className="feature-card card text-center">
            <div className="feature-icon">↩️</div>
            <h3>Easy Returns</h3>
            <p>30-day return policy</p>
          </div>
          <div className="feature-card card text-center">
            <div className="feature-icon">🔒</div>
            <h3>Secure Payment</h3>
            <p>Your data is always safe</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;