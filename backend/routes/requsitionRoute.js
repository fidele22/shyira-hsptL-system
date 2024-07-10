// routes/logisticRequests.js
const express = require('express');
const multer = require('multer');
const path = require('path');
const LogisticRequest = require('../models/LogisticRequest');
const ForwardedRequest = require('../models/requestFromLgst');

const router = express.Router();

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

router.post('/submit', upload.fields([
  { name: 'hodSignature' },
  { name: 'logisticSignature' },
  { name: 'ackReceiptSignature' },
  { name: 'dafSignature' },
]), async (req, res) => {
  try {
    const {
      district,
      healthFacility,
      department,
      items,
      signature,
      date,
    } = req.body;

    const newRequest = new LogisticRequest({
      district,
      healthFacility,
      department,
      items: JSON.parse(items),
      signature,
      date,
      hodSignature: req.files['hodSignature'] ? req.files['hodSignature'][0].path : null,
      logisticSignature: req.files['logisticSignature'] ? req.files['logisticSignature'][0].path : null,
      ackReceiptSignature: req.files['ackReceiptSignature'] ? req.files['ackReceiptSignature'][0].path : null,
      dafSignature: req.files['dafSignature'] ? req.files['dafSignature'][0].path : null,
    });

    await newRequest.save();
    res.status(200).json({ message: 'Requisition submitted successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error submitting requisition' });
  }
});

// Route to fetch all logistic requests
router.get('/', async (req, res) => {
  try {
    const requests = await LogisticRequest.find();
    res.json(requests);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});
// Example route to fetch a single logistic request by ID
router.get('/:id', async (req, res) => {
  try {
    const requestId = req.params.id;
    const request = await LogisticRequest.findById(requestId); // Assuming Mongoose model
    if (!request) {
      return res.status(404).json({ message: 'Request not found' });
    }
    res.json(request);
  } catch (error) {
    console.error('Error fetching request:', error);
    res.status(500).json({ message: 'Server error' });
  }
});
// Update a logistic request by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedRequest = await LogisticRequest.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedRequest) {
      return res.status(404).json({ message: 'Request not found' });
    }
    
    // Forward the updated request to another collection
    const forwardedRequest = new ForwardedRequest(req.body);
    await forwardedRequest.save();
    
    res.json(updatedRequest);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


module.exports = router;


