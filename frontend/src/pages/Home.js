import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import ProductList from '../components/products/ProductList';
import '../styles/Home.css';

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { getCartItemCount } = useCart();
  const cartItemCount = getCartItemCount();

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const featuredCategories = [
    {
      name: 'Electronics',
      icon: '📱',
      count: '24 Products',
      image: 'https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=400&h=300&fit=crop',
      link: '/products?category=electronics'
    },
    {
      name: 'Clothing',
      icon: '👕',
      count: '18 Products',
      image: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=400&h=300&fit=crop',
      link: '/products?category=clothing'
    },
    {
      name: 'Home & Kitchen',
      icon: '🏠',
      count: '15 Products',
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop',
      link: '/products?category=home'
    },
    {
      name: 'Books',
      icon: '📚',
      count: '12 Products',
      image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=300&fit=crop',
      link: '/products?category=books'
    }
  ];

  const features = [
    {
      icon: '🚚',
      title: 'Free Shipping',
      description: 'Free delivery on orders over $50'
    },
    {
      icon: '💳',
      title: 'Secure Payment',
      description: '100% secure payment processing'
    },
    {
      icon: '↩️',
      title: 'Easy Returns',
      description: '30-day money-back guarantee'
    },
    {
      icon: '🛡️',
      title: 'Quality Assurance',
      description: 'Products quality guaranteed'
    }
  ];

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-container">
          <div className="hero-content">
            <h1 className="hero-title">
              Discover Amazing Products
              <span className="hero-subtitle">At Great Prices</span>
            </h1>
            <p className="hero-description">
              Shop the latest trends in electronics, fashion, home goods and more. 
              Quality products with fast delivery and excellent customer service.
            </p>
            <div className="hero-actions">
              <Link to="/products" className="btn btn-primary">
                Shop Now
              </Link>
              <Link to="/about" className="btn btn-secondary">
                Learn More
              </Link>
            </div>
            <div className="hero-stats">
              <div className="stat">
                <span className="stat-number">500+</span>
                <span className="stat-label">Happy Customers</span>
              </div>
              <div className="stat">
                <span className="stat-number">1000+</span>
                <span className="stat-label">Products</span>
              </div>
              <div className="stat">
                <span className="stat-number">24/7</span>
                <span className="stat-label">Support</span>
              </div>
            </div>
          </div>
          <div className="hero-image">
            <div className="image-container">
              <img 
                src="https://images.unsplash.com/photo-1607082350899-7e105aa886ae?w=600&h=500&fit=crop" 
                alt="Shopping experience" 
              />
              <div className="floating-card sales-card">
                <span className="sales-icon">🔥</span>
                <div className="sales-content">
                  <span className="sales-text">Summer Sale</span>
                  <span className="sales-discount">Up to 50% OFF</span>
                </div>
              </div>
              <div className="floating-card review-card">
                <div className="stars">★★★★★</div>
                <span className="review-text">4.8/5 from 500+ reviews</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <h2 className="section-title">Why Choose MERN Mart?</h2>
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon">{feature.icon}</div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Shop by Category</h2>
            <Link to="/products" className="view-all">
              View All Categories →
            </Link>
          </div>
          <div className="categories-grid">
            {featuredCategories.map((category, index) => (
              <Link key={index} to={category.link} className="category-card">
                <div className="category-image">
                  <img src={category.image} alt={category.name} />
                  <div className="category-overlay">
                    <span className="category-icon">{category.icon}</span>
                  </div>
                </div>
                <div className="category-content">
                  <h3 className="category-name">{category.name}</h3>
                  <p className="category-count">{category.count}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="featured-products">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Featured Products</h2>
            <p className="section-subtitle">Discover our most popular items</p>
          </div>
          <ProductList searchQuery={searchQuery} />
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">Ready to Start Shopping?</h2>
            <p className="cta-description">
              Join thousands of satisfied customers who trust MERN Mart for 
              quality products and exceptional service.
            </p>
            <div className="cta-actions">
              <Link to="/products" className="btn btn-primary btn-large">
                Explore Products
              </Link>
              <Link to="/about" className="btn btn-secondary btn-large">
                Learn About Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;