// Assuming you're using Express
const express = require('express');
const router = express.Router();
const User = require('../models/user');
//const authMiddleware = require('../middleware/auth');

router.put('/', async (req, res) => {
  try {
    const userId = req.user._id;
    const updatedData = req.body;
    
    const updatedUser = await User.findByIdAndUpdate(userId, updatedData, { new: true });
    res.json(updatedUser);
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).send('Server error');
  }
});

module.exports = router;
