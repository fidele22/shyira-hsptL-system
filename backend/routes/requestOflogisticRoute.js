const express = require('express');
const multer = require('multer');

const LogisticRequest = require('../models/requestOfLogistic');
const Item = require('../models/item');
const router = express.Router();
const upload = multer({ dest: 'uploads/' });

//router.post('/submit', upload.none(), async (req, res) => {
//  try {
//    const { items, date } = req.body;
//    const logisticSignature = req.file ? req.file.path : '';
//
//    const newRequest = new LogisticRequest({
//      date,
//      supplierName, // Add supplierName
//      items: JSON.parse(items),
//      logisticSignature
//    });
//
//    await newRequest.save();
//    res.status(201).json({ message: 'Requisition submitted successfully!' });
//  } catch (error) {
//    res.status(500).json({ error: 'Error submitting requisition' });
//  }
//});
//

// Apply the multer middleware to handle form data
router.post('/submit', upload.none(), async (req, res) => {
  try {
    console.log('Request Body:', req.body); // Log the request body

    const { supplierName, items, date } = req.body;

    // Ensure items is defined and a valid JSON string
    if (!items) {
      throw new Error('Items field is missing.');
    }

    // Validate items
    const parsedItems = JSON.parse(items); // Assuming items is a JSON string

    console.log('Parsed Items:', parsedItems); // Log parsed items

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
        price: item.price,
        totalAmount: item.totalAmount
      };
    }));

    // Create userRequest
    const newRequest = new LogisticRequest({
      supplierName,
      items: validItems,
      date,
    });

    await newRequest.save();
    res.status(201).json({ message: 'Requisition created successfully!' });

  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
