import React, { useState } from 'react';
import ProductList from '../components/products/ProductList';
import '../styles/Home.css';

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <div className="home">
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to MERN Mart</h1>
          <p>Discover amazing products at great prices</p>
        </div>
      </section>

      <section className="featured-products">
        <h2>Featured Products</h2>
        <ProductList searchQuery={searchQuery} />
      </section>
    </div>
  );
};

export default Home;