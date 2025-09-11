import React from 'react';

const ProductFilter = ({ filters, onFilterChange, productCount }) => {
  const categories = ['all', 'electronics', 'clothing', 'home', 'books'];
  const priceRanges = [
    { value: '', label: 'Any Price' },
    { value: '0-50', label: 'Under $50' },
    { value: '50-100', label: '$50 - $100' },
    { value: '100-200', label: '$100 - $200' },
    { value: '200-', label: 'Over $200' }
  ];
  const sortOptions = [
    { value: 'name', label: 'Name' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' }
  ];

  const handleCategoryChange = (category) => {
    onFilterChange({ category: category === 'all' ? '' : category });
  };

  const handlePriceChange = (priceRange) => {
    onFilterChange({ priceRange });
  };

  const handleSortChange = (sortBy) => {
    onFilterChange({ sortBy });
  };

  return (
    <div className="product-filter">
      <div className="filter-section">
        <h4>Categories</h4>
        <div className="category-filters">
          {categories.map(category => (
            <button
              key={category}
              className={`category-btn ${filters.category === (category === 'all' ? '' : category) ? 'active' : ''}`}
              onClick={() => handleCategoryChange(category)}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="filter-section">
        <h4>Price Range</h4>
        <select 
          value={filters.priceRange} 
          onChange={(e) => handlePriceChange(e.target.value)}
          className="price-filter"
        >
          {priceRanges.map(range => (
            <option key={range.value} value={range.value}>
              {range.label}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-section">
        <h4>Sort By</h4>
        <select 
          value={filters.sortBy} 
          onChange={(e) => handleSortChange(e.target.value)}
          className="sort-filter"
        >
          {sortOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div className="product-count">
        Showing {productCount} products
      </div>
    </div>
  );
};

export default ProductFilter;