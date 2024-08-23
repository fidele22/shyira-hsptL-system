const express = require('express');
const router = express.Router();
const FuelRequisition = require('../models/fuelRequisition');
const ForwardedFuelRequest = require('../models/fuelRequestVerified');

// POST route to create a new fuel requisition
router.post('/submit', async (req, res) => {
  try {
    const {
      requesterName,
      carPlaque,
      kilometers,
      quantityRequested,
      quantityReceived,
      destination,
      reason,
      remainingliters,
      hodName,
      hodSignature,
    } = req.body;

    // Fetch the previous request for the same car
    const previousRequisition = await FuelRequisition.findOne({ carPlaque }).sort({ createdAt: -1 });

    let average = 0;
    if (previousRequisition) {
      const previousKilometers = previousRequisition.kilometers;
      const previousRemainingLiters = previousRequisition.remainingliters;
      const previousQuantityReceived = previousRequisition.quantityReceived;

      average = (kilometers - previousKilometers) / (previousRemainingLiters + previousQuantityReceived - remainingliters);
    }

    const newRequisition = new FuelRequisition({
      requesterName,
      carPlaque,
      kilometers,
      quantityRequested,
      quantityReceived,
      remainingliters,
      reason,
      average,
      hodName,
      hodSignature,
    });

    const savedRequisition = await newRequisition.save();
    res.status(201).json(savedRequisition);
  } catch (error) {
    console.error('Error creating requisition:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET route to fetch all fuel requisitions
router.get('/', async (req, res) => {
  try {
    const requisitions = await FuelRequisition.find();
    res.status(200).json(requisitions);
  } catch (error) {
    console.error('Error fetching requisitions:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Route to fetch a single fuel requisition by ID
router.get('/:id', async (req, res) => {
  try {
    const requisition = await FuelRequisition.findById(req.params.id);
    if (!requisition) {
      return res.status(404).json({ message: 'Requisition not found' });
    }
    res.status(200).json(requisition);
  } catch (error) {
    console.error('Error fetching requisition:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Route to update and forward on another collection a fuel requisition by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedRequisition = await FuelRequisition.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedRequisition) {
      return res.status(404).json({ message: 'Requisition not found' });
    }

    // Forward the updated requisition to the forwarded collection
    const forwardedData = new ForwardedFuelRequest({
      ...updatedRequisition.toObject(),
      originalRequisitionId: updatedRequisition._id,
    });

    await forwardedData.save();

    res.status(200).json(updatedRequisition);
  } catch (error) {
    console.error('Error updating requisition:', error);
    res.status(500).json({ message: 'Server error' });
  }
});
 

// router to proced on daf dashboard

// GET route to fetch all fuel requisitions


module.exports = router;
