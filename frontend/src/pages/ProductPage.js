import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ProductDetail from '../components/ProductDetail';
import './ProductPage.css'; // We'll create this CSS file

const ProductPage = ({ onAddToCart, products }) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get(`http://localhost:5000/api/products/${id}`);
        
        if (response.data && response.data.success) {
          setProduct(response.data.data);
        } else {
          setError('Product not found');
        }
      } catch (error) {
        console.error('Error fetching product:', error);
        if (error.response?.status === 404) {
          setError('Product not found');
        } else if (error.response?.status === 500) {
          setError('Server error. Please try again later.');
        } else {
          setError('Failed to load product. Please check your connection.');
        }
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  const handleAddToCart = (productData) => {
    onAddToCart(productData);
    // You could add a toast notification here
  };

  const handleRetry = () => {
    setLoading(true);
    setError(null);
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        setError('Failed to load product. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  };

  if (loading) {
    return (
      <div className="product-page-container">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading product details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="product-page-container">
        <div className="error-state">
          <div className="error-icon">⚠️</div>
          <h2>Oops! Something went wrong</h2>
          <p>{error}</p>
          <div className="error-actions">
            <button onClick={handleRetry} className="retry-btn">
              Try Again
            </button>
            <button onClick={() => navigate('/products')} className="back-btn">
              Back to Products
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="product-page-container">
        <div className="not-found">
          <div className="not-found-icon">🔍</div>
          <h2>Product Not Found</h2>
          <p>The product you're looking for doesn't exist or has been removed.</p>
          <button onClick={() => navigate('/products')} className="back-to-products">
            Browse All Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="product-page-container">
      <ProductDetail 
        product={product} 
        onAddToCart={handleAddToCart}
        products={products} // Pass all products for related items
      />
    </div>
  );
};

export default ProductPage;