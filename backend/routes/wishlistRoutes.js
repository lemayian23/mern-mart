const express = require('express');
const { 
  getWishlist, 
  addToWishlist, 
  removeFromWishlist, 
  checkInWishlist 
} = require('../controllers/wishlistController');
const auth = require('../middleware/authMiddleware');

const router = express.Router();

router.use(auth);

router.get('/', getWishlist);
router.post('/', addToWishlist);
router.delete('/:productId', removeFromWishlist);
router.get('/check/:productId', checkInWishlist);

module.exports = router;