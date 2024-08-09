const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken'); // Add this line to import jsonwebtoken
const jwtSecret = 'your_jwt_secret_key';
const { upload, registerUser, loginUser, getUsers, updateUser, deleteUser, authenticate, getProfile } = require('../controllers/userController');
const User = require('../models/user'); // Make sure to import your User model

router.post('/register', upload.single('signature'), registerUser);
router.post('/login', loginUser);
router.get('/', getUsers);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

// Profile route
router.get('/profile', authenticate, getProfile);

// Get users with role 'logistic'
router.get('/logistic-users', async (req, res) => {
    try {
      const logisticUsers = await User.find({ role: 'logistic' }).select('firstName lastName signature');
      res.json(logisticUsers);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching logistic users', error });
    }
  });
  
// Logout route
router.post('/logout', (req, res) => {
    // Invalidate the token by clearing it on the client-side or marking it as invalid in your system
    res.status(200).json({ message: 'Logged out successfully' });
});



module.exports = router;
