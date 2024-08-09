const express = require('express');
const multer = require('multer');
const path = require('path');
const UserRequest = require('../models/UserRequest');
const ForwardedRequest = require('../models/requestFromLgst');
const Item = require('../models/stockItems'); // Fix the import here


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

// Apply the multer middleware to handle form data
router.post('/submit', upload.none(), async (req, res) => {
  try {
    console.log('Request Body:', req.body); // Log the request body

    const { department, items, date } = req.body;

    // Ensure items is defined and a valid JSON string
    if (!items) {
      throw new Error('Items field is missing.');
    }

    // Validate items
    const parsedItems = JSON.parse(items); // Assuming items is a JSON string
    const validItems = await Promise.all(parsedItems.map(async item => {
      if (!item.itemId) {
        throw new Error('Item ID is required for each item.');
      }

      // Ensure itemId is valid
      const validItem = await Item.findById(item.itemId);
      if (!validItem) {
        throw new Error('Invalid Item ID.');
      }

      return {
        itemId: item.itemId,
        itemName: item.itemName,
        quantityRequested: item.quantityRequested,
        quantityReceived: item.quantityReceived,
        observation: item.observation
      };
    }));

    // Create userRequest
    const newRequest = new UserRequest({
      department,
      items: validItems,
      date,
      hodName: req.body.hodName,
      hodSignature: req.body.hodSignature,
      logisticName: req.body.logisticName,
    });

    await newRequest.save();
    res.status(201).json({ message: 'Requisition created successfully!' });

  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
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


// fetching item name
router.get('/', async (req, res) => {
  try {
    const items = await Item.find();
    res.status(200).json(items);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


module.exports = router;
