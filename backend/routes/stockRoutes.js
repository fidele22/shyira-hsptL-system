const express = require('express');
const router = express.Router();
const Stock = require('../models/ficheDeStock');
const Item = require('../models/item');

// Add stock entry for an item
router.post('/', async (req, res) => {
  const { itemId, entry = {}, exit = {}, balance = {} } = req.body;

  try {
    const newStock = new Stock({
      itemId,
      entry: {
        quantity: entry.quantity || 0,
        pricePerUnit: entry.pricePerUnit || 0,
        totalAmount: entry.totalAmount || 0
      },
      exit: {
        quantity: exit.quantity || 0,
        pricePerUnit: exit.pricePerUnit || 0,
        totalAmount: exit.totalAmount || 0
      },
      balance: {
        quantity: balance.quantity || 0,
        pricePerUnit: balance.pricePerUnit || 0,
        totalAmount: balance.totalAmount || 0
      }
    });

    const savedStock = await newStock.save();
    res.status(201).json(savedStock);
  } catch (error) {
    res.status(400).json({ message: 'Error adding stock entry', error });
  }
});

// Fetch stock entries for an item
// Fetch stock entries for an item
router.get('/:itemId', async (req, res) => {
  const { itemId } = req.params;
  console.log(`Fetching stock entries for itemId: ${itemId}`); // Log itemId

  try {
    const stockEntries = await Stock.find({ itemId }).populate('itemId');
    console.log(`Stock entries found: ${stockEntries.length}`); // Log number of stock entries found
    res.status(200).json(stockEntries);
  } catch (error) {
    console.error('Error fetching stock entries:', error);
    res.status(400).json({ message: 'Error fetching stock entries', error });
  }
});
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const updatedStock = req.body;

  try {
    const stock = await Stock.findByIdAndUpdate(id, updatedStock, { new: true });
    if (!stock) {
      return res.status(404).send('Stock entry not found');
    }
    res.json(stock);
  } catch (error) {
    res.status(500).send('Error updating stock: ' + error.message);
  }
});
module.exports = router;
