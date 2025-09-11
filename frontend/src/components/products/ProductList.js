import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import ProductFilter from './ProductFilter';
// Remove the productService import for now since we'll use mock data
// import { productService } from '../../services/productService';

const ProductList = ({ searchQuery = '' }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    category: '',
    priceRange: '',
    sortBy: 'name'
  });

  // Mock product data
  const mockProducts = [
    {
      _id: '1',
      name: 'Wireless Headphones',
      price: 99.99,
      description: 'High-quality wireless headphones with noise cancellation',
      image: 'https://via.placeholder.com/300x300?text=Headphones',
      category: 'electronics',
      inStock: true
    },
    {
      _id: '2',
      name: 'Running Shoes',
      price: 129.99,
      description: 'Comfortable running shoes for all terrains',
      image: 'https://via.placeholder.com/300x300?text=Shoes',
      category: 'clothing',
      inStock: true
    },
    {
      _id: '3',
      name: 'Smart Watch',
      price: 199.99,
      description: 'Feature-rich smartwatch with health monitoring',
      image: 'https://via.placeholder.com/300x300?text=Watch',
      category: 'electronics',
      inStock: false
    },
    {
      _id: '4',
      name: 'Coffee Maker',
      price: 79.99,
      description: 'Automatic coffee maker with programmable settings',
      image: 'https://via.placeholder.com/300x300?text=Coffee+Maker',
      category: 'home',
      inStock: true
    },
    {
      _id: '5',
      name: 'Programming Book',
      price: 39.99,
      description: 'Comprehensive guide to modern web development',
      image: 'https://via.placeholder.com/300x300?text=Book',
      category: 'books',
      inStock: true
    },
    {
      _id: '6',
      name: 'Yoga Mat',
      price: 49.99,
      description: 'Eco-friendly yoga mat for comfortable practice',
      image: 'https://via.placeholder.com/300x300?text=Yoga+Mat',
      category: 'sports',
      inStock: true
    }
  ];

  useEffect(() => {
    loadProducts();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [products, filters, searchQuery]);

  const loadProducts = async () => {
    try {
      setLoading(true);
      // Using mock data instead of API call for now
      setProducts(mockProducts);
      setFilteredProducts(mockProducts);
      
      // Uncomment this when your backend product API is ready:
      // const response = await productService.getAllProducts();
      // setProducts(response.data);
      // setFilteredProducts(response.data);
    } catch (err) {
      setError('Failed to load products');
      console.error('Error loading products:', err);
    } finally {
      setLoading(false);
    }
  };

  const filterProducts = () => {
    let filtered = [...products];

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply category filter
    if (filters.category) {
      filtered = filtered.filter(product => product.category === filters.category);
    }

    // Apply price range filter
    if (filters.priceRange) {
      const [min, max] = filters.priceRange.split('-').map(Number);
      if (max) {
        filtered = filtered.filter(product => product.price >= min && product.price <= max);
      } else {
        filtered = filtered.filter(product => product.price >= min);
      }
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (filters.sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'name':
        default:
          return a.name.localeCompare(b.name);
      }
    });

    setFilteredProducts(filtered);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  if (loading) {
    return <div className="loading">Loading products...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="product-list-container">
      <ProductFilter 
        filters={filters}
        onFilterChange={handleFilterChange}
        productCount={filteredProducts.length}
      />
      
      <div className="products-grid">
        {filteredProducts.length === 0 ? (
          <div className="no-products">
            <h3>No products found</h3>
            <p>Try adjusting your search or filters</p>
          </div>
        ) : (
          filteredProducts.map(product => (
            <ProductCard key={product._id} product={product} />
          ))
        )}
      </div>
    </div>
  );
};

export default ProductList;