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

// Update position
router.put('/positions/:id', async (req, res) => {
  try {
    const position = await Position.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!position) {
      return res.status(404).json({ message: 'Position not found' });
    }
    res.json(position);
  } catch (error) {
    console.error('Error updating position:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete position
router.delete('/positions/:id', async (req, res) => {
  try {
    const position = await Position.findByIdAndDelete(req.params.id);
    if (!position) {
      return res.status(404).json({ message: 'Position not found' });
    }
    res.json({ message: 'Position deleted' });
  } catch (error) {
    console.error('Error deleting position:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
