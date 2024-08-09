const express = require('express');
const router = express.Router();
const ForwardedRequest = require('../models/requestFromLgst');
const ApprovedRequest = require('../models/approvedRequest');

// Fetch all forwarded requests
router.get('/', async (req, res) => {
  try {
    const requests = await ForwardedRequest.find();
    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Fetch a specific forwarded request
router.get('/:id', async (req, res) => {
  try {
    const request = await ForwardedRequest.findById(req.params.id);
    res.json(request);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a forwarded request
router.put('/:id', async (req, res) => {
  try {
    const updatedRequest = await ForwardedRequest.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedRequest);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Forward a request to the approved collection
router.post('/:id/approve', async (req, res) => {
  try {
    const forwardedRequest = await ForwardedRequest.findById(req.params.id);
    const approvedRequest = new ApprovedRequest(forwardedRequest.toObject());
    await approvedRequest.save();
    res.status(201).json(approvedRequest);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.put('/forwardedrequests/:id', async (req, res) => {
    try {
      const updatedRequest = await ForwardedRequest.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updatedRequest) {
        return res.status(404).send('Request not found');
      }
  
      // Forward the updated request to the approved collection
      const approvedRequest = new ApprovedRequest(updatedRequest.toObject());
      await approvedRequest.save();
  
      res.status(200).json(updatedRequest);
    } catch (error) {
      res.status(500).send(error);
    }
  });



module.exports = router;
