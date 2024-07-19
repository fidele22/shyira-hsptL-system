// routes/department.js
const express = require('express');
const router = express.Router();
const Department = require('../models/department');

// POST /api/departments
router.post('/addDepart', async (req, res) => {
  try {
    const { name, description } = req.body;
    const department = new Department({ name, description });
    await department.save();
    res.status(201).json(department);
  } catch (error) {
    console.error('Error creating department:', error);
    res.status(500).json({ error: 'Server error' });
  }
});
// GET /api/positions - Fetch all positions
router.get('/', async (req, res) => {
  try {
    const departments = await Department.find();
    res.status(200).json(departments);
   
  } catch (error) {
    console.error('Error fetching services:', error);
    res.status(500).json({ error: 'Server error' });
    
  }
});
module.exports = router;
