const Wishlist = require('../models/Wishlist');

// Get user's wishlist
exports.getWishlist = async (req, res) => {
  try {
    let wishlist = await Wishlist.findOne({ user: req.user.id })
      .populate('items.product', 'name price image category inStock');
    
    if (!wishlist) {
      // Create empty wishlist if it doesn't exist
      wishlist = new Wishlist({ user: req.user.id, items: [] });
      await wishlist.save();
    }
    
    res.json(wishlist.items);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Add item to wishlist
exports.addToWishlist = async (req, res) => {
  try {
    const { productId } = req.body;
    
    let wishlist = await Wishlist.findOne({ user: req.user.id });
    
    if (!wishlist) {
      wishlist = new Wishlist({ 
        user: req.user.id, 
        items: [{ product: productId }] 
      });
    } else {
      // Check if product already exists in wishlist
      const existingItem = wishlist.items.find(
        item => item.product.toString() === productId
      );
      
      if (existingItem) {
        return res.status(400).json({ message: 'Product already in wishlist' });
      }
      
      wishlist.items.push({ product: productId });
    }
    
    await wishlist.save();
    await wishlist.populate('items.product', 'name price image category inStock');
    
    res.status(201).json(wishlist.items);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Product already in wishlist' });
    }
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Remove item from wishlist
exports.removeFromWishlist = async (req, res) => {
  try {
    const { productId } = req.params;
    
    const wishlist = await Wishlist.findOne({ user: req.user.id });
    
    if (!wishlist) {
      return res.status(404).json({ message: 'Wishlist not found' });
    }
    
    wishlist.items = wishlist.items.filter(
      item => item.product.toString() !== productId
    );
    
    await wishlist.save();
    res.json({ message: 'Item removed from wishlist' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Check if product is in wishlist
exports.checkInWishlist = async (req, res) => {
  try {
    const { productId } = req.params;
    
    const wishlist = await Wishlist.findOne({ 
      user: req.user.id,
      'items.product': productId
    });
    
    res.json({ inWishlist: !!wishlist });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};