import React, { useState, useEffect } from 'react';
import { useCart } from '../hooks/useCart';
import ProductCard from '../components/products/ProductCard';
import ProductFilter from '../components/products/ProductFilter';
import LoadingSpinner from '../components/common/Loading/LoadingSpinner';
import '../styles/Products.css';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    category: '',
    priceRange: '',
    sortBy: 'name',
    searchQuery: ''
  });
  
  const { addToCart } = useCart();

  // Mock product data - replace with API call later
// Replace the mockProducts array with this:
const mockProducts = [
  {
    _id: '1',
    name: 'Wireless Bluetooth Headphones',
    price: 99.99,
    description: 'High-quality wireless headphones with noise cancellation and 30-hour battery life',
    image: 'https://picsum.photos/300/300?random=1',
    category: 'electronics',
    inStock: true,
    rating: 4.5,
    reviews: 125
  },
  {
    _id: '2',
    name: 'Running Shoes',
    price: 129.99,
    description: 'Comfortable running shoes for all terrains with advanced cushioning technology',
    image: 'https://picsum.photos/300/300?random=2',
    category: 'clothing',
    inStock: true,
    rating: 4.3,
    reviews: 89
  },
  {
    _id: '3',
    name: 'Smart Watch',
    price: 199.99,
    description: 'Feature-rich smartwatch with health monitoring, GPS, and smartphone integration',
    image: 'https://picsum.photos/300/300?random=3',
    category: 'electronics',
    inStock: false,
    rating: 4.7,
    reviews: 203
  },
  {
    _id: '4',
    name: 'Coffee Maker',
    price: 79.99,
    description: 'Automatic coffee maker with programmable settings and thermal carafe',
    image: 'https://picsum.photos/300/300?random=4',
    category: 'home',
    inStock: true,
    rating: 4.2,
    reviews: 67
  },
  {
    _id: '5',
    name: 'Programming Book',
    price: 39.99,
    description: 'Comprehensive guide to modern web development and programming concepts',
    image: 'https://picsum.photos/300/300?random=5',
    category: 'books',
    inStock: true,
    rating: 4.8,
    reviews: 156
  },
  {
    _id: '6',
    name: 'Yoga Mat',
    price: 49.99,
    description: 'Eco-friendly yoga mat for comfortable practice with non-slip surface',
    image: 'https://picsum.photos/300/300?random=6',
    category: 'sports',
    inStock: true,
    rating: 4.4,
    reviews: 92
  },
  {
    _id: '7',
    name: 'Laptop Backpack',
    price: 89.99,
    description: 'Durable laptop backpack with multiple compartments and USB charging port',
    image: 'https://picsum.photos/300/300?random=7',
    category: 'accessories',
    inStock: true,
    rating: 4.6,
    reviews: 178
  },
  {
    _id: '8',
    name: 'Wireless Mouse',
    price: 29.99,
    description: 'Ergonomic wireless mouse with precision tracking and long battery life',
    image: 'https://picsum.photos/300/300?random=8',
    category: 'electronics',
    inStock: true,
    rating: 4.1,
    reviews: 114
  }
];

  useEffect(() => {
    // Simulate API call
    const loadProducts = async () => {
      try {
        setLoading(true);
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        setProducts(mockProducts);
        setFilteredProducts(mockProducts);
      } catch (err) {
        setError('Failed to load products');
        console.error('Error loading products:', err);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [filters, products]);

  const filterProducts = () => {
    let filtered = [...products];

    // Apply search filter
    if (filters.searchQuery) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(filters.searchQuery.toLowerCase())
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
        case 'rating':
          return b.rating - a.rating;
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

  const handleSearch = (query) => {
    setFilters(prev => ({ ...prev, searchQuery: query }));
  };

  const handleAddToCart = (product) => {
    addToCart(product, 1);
  };

  if (loading) {
    return (
      <div className="products-loading">
        <LoadingSpinner size="large" text="Loading products..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="products-error">
        <h2>Oops! Something went wrong</h2>
        <p>{error}</p>
        <button onClick={() => window.location.reload()} className="btn-primary">
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="products-page">
      <div className="products-header">
        <h1>Our Products</h1>
        <p>Discover amazing products at great prices</p>
        
        {/* Search Bar */}
        <div className="products-search">
          <input
            type="text"
            placeholder="Search products..."
            value={filters.searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="search-input"
          />
          <span className="search-icon">🔍</span>
        </div>
      </div>

      <div className="products-content">
        {/* Filters Sidebar */}
        <div className="products-sidebar">
          <ProductFilter 
            filters={filters}
            onFilterChange={handleFilterChange}
            productCount={filteredProducts.length}
            totalProducts={products.length}
          />
        </div>

        {/* Products Grid */}
        <div className="products-main">
          <div className="products-info">
            <p>Showing {filteredProducts.length} of {products.length} products</p>
            <select
              value={filters.sortBy}
              onChange={(e) => handleFilterChange({ sortBy: e.target.value })}
              className="sort-select"
            >
              <option value="name">Sort by Name</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="no-products">
              <h3>No products found</h3>
              <p>Try adjusting your search or filters</p>
              <button 
                onClick={() => setFilters({
                  category: '',
                  priceRange: '',
                  sortBy: 'name',
                  searchQuery: ''
                })}
                className="btn-secondary"
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <div className="products-grid">
              {filteredProducts.map(product => (
                <ProductCard 
                  key={product._id} 
                  product={product}
                  onAddToCart={handleAddToCart}
                />
              ))}
            </div>
          )}

          {/* Load More Button (for pagination) */}
          {filteredProducts.length > 0 && filteredProducts.length < products.length && (
            <div className="load-more">
              <button className="btn-primary">
                Load More Products
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;