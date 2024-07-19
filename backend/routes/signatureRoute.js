const express = require('express');
const jwt = require('jsonwebtoken');
const jwtSecret = 'your_jwt_secret_key';
const router = express.Router();
const User = require('../models/user')

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

  
