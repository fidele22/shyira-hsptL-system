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

// Logout route
router.post('/logout', (req, res) => {
    // Invalidate the token by clearing it on the client-side or marking it as invalid in your system
    res.status(200).json({ message: 'Logged out successfully' });
});

router.get('/signature', async (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
  
    try {
      const decoded = jwt.verify(token, jwtSecret);
      const user = await User.findById(decoded.userId);
      if (!user || !user.signature) {
        return res.status(404).json({ message: 'Signature not found' });
      }
  
      res.sendFile(user.signature, { root: '.' });
    } catch (err) {
      res.status(500).json({ message: 'Server error' });
    }
  });
  

module.exports = router;
