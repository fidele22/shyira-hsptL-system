const express = require('express');
const router = express.Router();
const ForwardedRequest = require('../models/requestFromLgst');
const ApprovedRequest = require('../models/approvedRequest');
const ForwardedFuelRequest = require('../models/fuelRequestVerified')
const ApprovedFuelRequest = require ('../models/approvedfuelRequest')


// Fetch all verified requests
router.get('/items', async (req, res) => {
  try {
    const requests = await ForwardedRequest.find();
    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.get('/fuel', async (req, res) => {
  try {
    const fuelrequisitions = await ForwardedFuelRequest.find();
    res.status(200).json(fuelrequisitions);
  } catch (error) {
    console.error('Error fetching requisitions:', error);
    res.status(500).json({ message: 'Server error' });
  }
});
// Fetch a specific verified by  request ID
router.get('/:id', async (req, res) => {
  try {
    const request = await ForwardedRequest.findById(req.params.id);
    res.json(request);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.get('/fuel/:id', async (req, res) => {
  try {
    const request = await ForwardedFuelRequest.findById(req.params.id);
    res.json(request);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a forwarded item  requisition
router.put('/:id', async (req, res) => {
  try {
    const updatedRequest = await ForwardedRequest.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedRequest);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Forward a request to the approved collection
router.post('/approved/:id', async (req, res) => {
  try {
    const forwardedRequest = await ForwardedRequest.findById(req.params.id);
    
    if (!forwardedRequest) {
      return res.status(404).json({ message: 'Forwarded request not found' });
    }
    
    // Create a new approved request and include the userId
    const approvedRequest = new ApprovedRequest({
      userId: forwardedRequest.userId, // Include userId from forwarded request
      department: forwardedRequest.department,
      items: forwardedRequest.items,
      hodName: forwardedRequest.hodName,
      hodSignature: forwardedRequest.hodSignature,
      date: forwardedRequest.date,
      clicked: req.body.clicked || false // Use the clicked status if provided, else default to false
    });

    await approvedRequest.save();
    res.status(201).json(approvedRequest);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// Forward a request to the approved collection
router.post('/approved/fuel/:id', async (req, res) => {
  try {
    const forwardedfuelRequest = await ForwardedFuelRequest.findById(req.params.id);
    
    if (!forwardedfuelRequest) {
      return res.status(404).json({ message: 'Forwarded request not found' });
    }
    
    // Create a new approved request and include the userId
    const approvedFuelRequest = new ApprovedFuelRequest({
      originalRequisitionId: forwardedfuelRequest.originalRequisitionId, // Include userId from forwarded request
      requesterName: forwardedfuelRequest.requesterName,
      carPlaque: forwardedfuelRequest.carPlaque,
      quantityRequested: forwardedfuelRequest.quantityRequested,
      kilometers: forwardedfuelRequest.hodSignature,
      quantityReceived: forwardedfuelRequest.quantityReceived,
      destination:forwardedfuelRequest.destination,
      modifyOption:forwardedfuelRequest.modifyOption,
      hodName:forwardedfuelRequest.hodName,
     
      clicked: req.body.clicked || false // Use the clicked status if provided, else default to false
    });

    await approvedFuelRequest.save();
    res.status(201).json(approvedFuelRequest);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//router.put('/forwardedrequests/:id', async (req, res) => {
//    try {
//      const updatedRequest = await ForwardedRequest.findByIdAndUpdate(req.params.id, req.body, { new: true });
//      if (!updatedRequest) {
//        return res.status(404).send('Request not found');
//      }
//  
//      // Forward the updated request to the approved collection
//      const approvedRequest = new ApprovedRequest(updatedRequest.toObject());
//      await approvedRequest.save();
//  
//      res.status(200).json(updatedRequest);
//    } catch (error) {
//      res.status(500).send(error);
//    }
//  });
//
////requisition of fuel

// Fetch a specific verified by  request ID


module.exports = router;
