// routes/formRoutes.js
const express = require('express');
const CarPlaque = require('../models/carPlaque');
const Reason = require('../models/reason');
const Destination = require('../models/destination');

const router = express.Router();

// Route to handle submission of car plaque
router.post('/add-car-plaque', async (req, res) => {
  try {
    const { plaque } = req.body;
    const newCarPlaque = new CarPlaque({ plaque });
    await newCarPlaque.save();
    res.status(201).json({ message: 'Car plaque added successfully' });
  } catch (error) {
    console.error('Error adding car plaque:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Route to handle submission of reason
router.post('/add-reason', async (req, res) => {
  try {
    const { reason } = req.body;
    const newReason = new Reason({ reason });
    await newReason.save();
    res.status(201).json({ message: 'Reason added successfully' });
  } catch (error) {
    console.error('Error adding reason:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Route to handle submission of destination
router.post('/add-destination', async (req, res) => {
  try {
    const { destinationname } = req.body;
    const newDestination = new Destination({ destinationname });
    await newDestination.save();
    res.status(201).json({ message: 'Destination added successfully' });
  } catch (error) {
    console.error('Error adding destination:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// routers to fetch car,destination and reason used on fuel requesition
router.get('/cars', async (req, res) => {
    try {
      const cars = await CarPlaque.find({});
      res.json(cars);
    } catch (error) {
      console.error('Error fetching cars:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });
  
  router.get('/destinations', async (req, res) => {
    try {
      const destinations = await Destination.find({});
      res.json(destinations);
    } catch (error) {
      console.error('Error fetching destinations:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });
  
  router.get('/reasons', async (req, res) => {
    try {
      const reasons = await Reason.find({});
      res.json(reasons);
    } catch (error) {
      console.error('Error fetching reasons:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });
module.exports = router;
