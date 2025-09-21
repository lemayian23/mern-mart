const express = require('express');
const { 
  getUserAddresses, 
  getAddressById, 
  createAddress, 
  updateAddress, 
  deleteAddress, 
  setDefaultAddress 
} = require('../controllers/addressController');
const auth = require('../middleware/authMiddleware');

const router = express.Router();

router.use(auth);

router.get('/', getUserAddresses);
router.get('/:id', getAddressById);
router.post('/', createAddress);
router.put('/:id', updateAddress);
router.delete('/:id', deleteAddress);
router.patch('/:id/default', setDefaultAddress);

module.exports = router;