const express = require('express');
const router = express.Router();
const { submitContact, getContacts, getContact } = require('../controllers/contactController');
const auth = require('../middleware/auth');

router.post('/', submitContact);
router.get('/', auth, getContacts);
router.get('/:id', auth, getContact);

module.exports = router;