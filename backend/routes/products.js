const express = require('express');
const router = express.Router();

// Temporary product data
const products = [
  {
    _id: '1',
    name: 'Sample Product 1',
    price: 29.99,
    description: 'This is a sample product description',
    image: 'https://via.placeholder.com/300',
    category: 'electronics'
  },
  {
    _id: '2',
    name: 'Sample Product 2',
    price: 49.99,
    description: 'Another sample product description',
    image: 'https://via.placeholder.com/300',
    category: 'clothing'
  }
];

// Get all products
router.get('/', (req, res) => {
  res.json({
    message: 'Products retrieved successfully',
    data: products
  });
});

// Get single product
router.get('/:id', (req, res) => {
  const product = products.find(p => p._id === req.params.id);
  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }
  res.json({
    message: 'Product retrieved successfully',
    data: product
  });
});

module.exports = router;