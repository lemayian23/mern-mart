import React from 'react';
import '../styles/About.css';

const About = () => {
  return (
    <div className="about-page">
      <div className="container">
        <div className="about-content">
          <div className="about-header">
            <h1>About MERN Mart</h1>
            <p className="about-subtitle">
              Your trusted shopping destination built with modern technology
            </p>
          </div>

          <div className="about-grid">
            <div className="about-text">
              <section className="about-section">
                <h2>Our Story</h2>
                <p>
                  MERN Mart was founded with a simple mission: to provide customers with 
                  a seamless shopping experience powered by cutting-edge technology. 
                  We believe that everyone deserves access to quality products at affordable prices.
                </p>
              </section>

              <section className="about-section">
                <h2>What Makes Us Different</h2>
                <p>
                  Built on the modern MERN stack (MongoDB, Express.js, React, Node.js), 
                  our platform offers lightning-fast performance, real-time updates, and 
                  a user-friendly interface that makes shopping a pleasure.
                </p>
              </section>

              <section className="about-section">
                <h2>Our Commitment</h2>
                <p>
                  We're committed to quality, customer satisfaction, and continuous innovation. 
                  Every product in our catalog is carefully selected to ensure it meets our 
                  high standards of excellence.
                </p>
              </section>

              <section className="about-section">
                <h2>Join Our Community</h2>
                <p>
                  Become part of our growing community of satisfied customers. 
                  We're constantly adding new features and products to enhance your shopping experience.
                </p>
              </section>
            </div>

            <div className="about-stats">
              <div className="stat-card">
                <h3>10K+</h3>
                <p>Happy Customers</p>
              </div>

              <div className="stat-card">
                <h3>500+</h3>
                <p>Quality Products</p>
              </div>

              <div className="stat-card">
                <h3>24/7</h3>
                <p>Customer Support</p>
              </div>

              <div className="stat-card">
                <h3>99.9%</h3>
                <p>Uptime Guarantee</p>
              </div>
            </div>
          </div>

          <div className="about-features">
            <h2>Why Choose MERN Mart?</h2>
            <div className="features-grid">
              <div className="feature-card">
                <span className="feature-icon">🚀</span>
                <h4>Fast Delivery</h4>
                <p>Get your orders delivered quickly with our efficient shipping network.</p>
              </div>

              <div className="feature-card">
                <span className="feature-icon">🔒</span>
                <h4>Secure Payments</h4>
                <p>Shop with confidence using our secure payment processing system.</p>
              </div>

              <div className="feature-card">
                <span className="feature-icon">💯</span>
                <h4>Quality Guarantee</h4>
                <p>Every product is backed by our satisfaction guarantee.</p>
              </div>

              <div className="feature-card">
                <span className="feature-icon">🌱</span>
                <h4>Sustainable</h4>
                <p>We're committed to environmentally friendly practices.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;