//const express = require('express');
//const jwt = require('jsonwebtoken');
//const jwtSecret = 'your_jwt_secret_key';
//const router = express.Router();
//const User = require('../models/user')
//
//router.get('/signature', async (req, res) => {
//    const token = req.headers.authorization.split(' ')[1];
//    if (!token) {
//      return res.status(401).json({ message: 'Unauthorized' });
//    }
//  
//    try {
//      const decoded = jwt.verify(token, jwtSecret);
//      const user = await User.findById(decoded.userId);
//      if (!user || !user.signature) {
//        return res.status(404).json({ message: 'Signature not found' });
//      }
//  
//      res.sendFile(user.signature, { root: '.' });
//    } catch (err) {
//      res.status(500).json({ message: 'Server error' });
//    }
//  });
//
//  module.exports = router;
//
//  
// routes/service.js
const express = require('express');
const router = express.Router();
const UserRole = require('../models/userRoles');

// POST /api/services - Create a new service
router.post('/addRole', async (req, res) => {
  try {
    const { name, description } = req.body;
    const role = new UserRole({ name, description });
    await role.save();
    res.status(201).json(role);
  } catch (error) {
    console.error('Error creating service:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /api/services - Fetch all services
router.get('/', async (req, res) => {
  try {
    const roles = await UserRole.find();
    res.status(200).json(roles);
   
  } catch (error) {
    console.error('Error fetching services:', error);
    res.status(500).json({ error: 'Server error' });
    
  }
});

module.exports = router;
