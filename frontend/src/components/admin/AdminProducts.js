import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import './AdminProducts.css';

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    category: '',
    image: '',
    inStock: true,
    stockQuantity: 0
  });

  // Load mock products (replace with API call)
  useEffect(() => {
    const mockProducts = [
      {
        _id: '1',
        name: 'Wireless Headphones',
        price: 99.99,
        description: 'High-quality wireless headphones',
        category: 'electronics',
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop',
        inStock: true,
        stockQuantity: 50
      },
      {
        _id: '2',
        name: 'Running Shoes',
        price: 129.99,
        description: 'Comfortable running shoes',
        category: 'clothing',
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop',
        inStock: true,
        stockQuantity: 30
      }
    ];
    setProducts(mockProducts);
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editingProduct) {
      // Update existing product
      setProducts(prev => prev.map(p => 
        p._id === editingProduct._id 
          ? { ...p, ...formData, price: parseFloat(formData.price) }
          : p
      ));
      toast.success('Product updated successfully');
    } else {
      // Add new product
      const newProduct = {
        _id: Date.now().toString(),
        ...formData,
        price: parseFloat(formData.price)
      };
      setProducts(prev => [...prev, newProduct]);
      toast.success('Product added successfully');
    }
    
    setFormData({
      name: '',
      price: '',
      description: '',
      category: '',
      image: '',
      inStock: true,
      stockQuantity: 0
    });
    setEditingProduct(null);
    setShowForm(false);
  };

  const handleEdit = (product) => {
    setFormData({
      name: product.name,
      price: product.price.toString(),
      description: product.description,
      category: product.category,
      image: product.image,
      inStock: product.inStock,
      stockQuantity: product.stockQuantity
    });
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleDelete = (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setProducts(prev => prev.filter(p => p._id !== productId));
      toast.success('Product deleted successfully');
    }
  };

  return (
    <div className="admin-products">
      <div className="products-header">
        <h2>Product Management</h2>
        <button 
          className="btn-primary"
          onClick={() => setShowForm(true)}
        >
          + Add New Product
        </button>
      </div>

      {showForm && (
        <div className="product-form-modal">
          <div className="product-form">
            <h3>{editingProduct ? 'Edit Product' : 'Add New Product'}</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label>Product Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Price *</label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    step="0.01"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Description *</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  rows="3"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Category *</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Category</option>
                    <option value="electronics">Electronics</option>
                    <option value="clothing">Clothing</option>
                    <option value="home">Home & Kitchen</option>
                    <option value="books">Books</option>
                    <option value="sports">Sports</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Stock Quantity *</label>
                  <input
                    type="number"
                    name="stockQuantity"
                    value={formData.stockQuantity}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Image URL</label>
                <input
                  type="url"
                  name="image"
                  value={formData.image}
                  onChange={handleInputChange}
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <div className="form-check">
                <label>
                  <input
                    type="checkbox"
                    name="inStock"
                    checked={formData.inStock}
                    onChange={handleInputChange}
                  />
                  In Stock
                </label>
              </div>

              <div className="form-actions">
                <button type="submit" className="btn-primary">
                  {editingProduct ? 'Update Product' : 'Add Product'}
                </button>
                <button 
                  type="button" 
                  className="btn-secondary"
                  onClick={() => {
                    setShowForm(false);
                    setEditingProduct(null);
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="products-list">
        <div className="products-grid">
          {products.map(product => (
            <div key={product._id} className="product-card">
              <img src={product.image} alt={product.name} />
              <div className="product-info">
                <h4>{product.name}</h4>
                <p className="price">${product.price}</p>
                <p className="category">{product.category}</p>
                <p className="stock">
                  Stock: {product.stockQuantity} {product.inStock ? '✅' : '❌'}
                </p>
              </div>
              <div className="product-actions">
                <button 
                  className="btn-edit"
                  onClick={() => handleEdit(product)}
                >
                  Edit
                </button>
                <button 
                  className="btn-delete"
                  onClick={() => handleDelete(product._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminProducts;