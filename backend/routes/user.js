const express = require('express');
const router = express.Router();

// User profile route (placeholder)
router.get('/profile', (req, res) => {
  res.json({ message: 'User profile route' });
});

module.exports = router;