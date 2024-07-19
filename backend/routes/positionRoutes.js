// routes/position.js
const express = require('express');
const router = express.Router();
const Position = require('../models/position');


// POST /api/positions
router.post('/addPosition', async (req, res) => {
  try {
    const { name, description } = req.body;
    const position = new Position({ name, description });
    await position.save();
    res.status(201).json(position);
  } catch (error) {
    console.error('Error creating position:', error);
    res.status(500).json({ error: 'Server error' });
  }
});
// GET /api/positions - Fetch all positions
router.get('/', async (req, res) => {
  try {
    const positions = await Position.find();
    res.status(200).json(positions);
   
  } catch (error) {
    console.error('Error fetching services:', error);
    res.status(500).json({ error: 'Server error' });
    
  }
});
module.exports = router;
