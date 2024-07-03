const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user'); // Adjust the path as necessary

const router = express.Router();

// Your secret key for JWT
const JWT_SECRET = 'your_jwt_secret';

// Login route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ email });
    console.log('User found:', user); // Log user details

    if (!user) {
      console.log('Invalid email'); // Log invalid email
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    console.log('Password match:', isMatch); // Log password match result

    if (!isMatch) {
      console.log('Invalid password'); // Log invalid password
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign({ userId: user._id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, role: user.role });
  } catch (err) {
    console.error('Server error:', err); // Log server error
    res.status(500).json({ message: 'Server error' });
  }
});
module.exports = router;
