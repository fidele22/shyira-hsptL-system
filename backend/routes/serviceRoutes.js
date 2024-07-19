// routes/service.js
const express = require('express');
const router = express.Router();
const Service = require('../models/service');

// POST /api/services - Create a new service
router.post('/addService', async (req, res) => {
  try {
    const { name, description } = req.body;
    const service = new Service({ name, description });
    await service.save();
    res.status(201).json(service);
  } catch (error) {
    console.error('Error creating service:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /api/services - Fetch all services
router.get('/', async (req, res) => {
  try {
    const services = await Service.find();
    res.status(200).json(services);
   
  } catch (error) {
    console.error('Error fetching services:', error);
    res.status(500).json({ error: 'Server error' });
    
  }
});

module.exports = router;
