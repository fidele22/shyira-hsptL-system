const express = require('express');
const router = express.Router();
const Item = require('../models/item');
const Stock = require('../models/ficheDeStock');

// Add item
// Add new item
router.post('/add', async (req, res) => {
  try {
    const newItem = new Item(req.body);
    const savedItem = await newItem.save();

    // Create initial stock entry for the new item
    const newStock = new Stock({
      itemId: savedItem._id,
      entries: [],
      exits: [],
      balances: []
    });
    await newStock.save();

    res.status(201).json(savedItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get items
router.get('/', async (req, res) => {
  try {
    const items = await Item.find();
    res.status(200).json(items);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
// Update an item
router.put('/:id', async (req, res) => {
  try {
    const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedItem);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete an item
router.delete('/:id', async (req, res) => {
  try {
    await Item.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Item deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


module.exports = router;
