const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Stock = require('../models/ficheDeStock');
const Item = require('../models/item');
const StockHistory = require('../models/stockHistory');

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


// Middleware to validate ObjectId
function isValidObjectId(id) {
  return mongoose.Types.ObjectId.isValid(id);
}

// Fetch stock entries for an item
router.get('/:itemId', async (req, res) => {
  const { itemId } = req.params;

  // Check if itemId is a valid ObjectId
  if (!isValidObjectId(itemId)) {
    return res.status(400).send('Invalid itemId');
  }
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

//// Update stock entry
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const updatedStock = req.body;

  try {
    const stock = await Stock.findByIdAndUpdate(id, updatedStock, { new: true });
    if (!stock) {
      return res.status(404).send('Stock entry not found');
    }

    // Log the update to the StockHistory collection
    const stockHistory = new StockHistory({
      itemId: stock.itemId,
      entry: stock.entry,
      exit: stock.exit,
      balance: stock.balance,
      updatedAt: Date.now() // Set the updated date
    });
    await stockHistory.save();

    res.json(stock);
  } catch (error) {
    res.status(500).send('Error updating stock: ' + error.message);
  }
});


// Fetch stock history for an item with date range
router.get('/history/:itemId', async (req, res) => {
  const { itemId } = req.params;
  const { startDate, endDate } = req.query;

  try {
    const query = { itemId };

    if (startDate && endDate) {
      query.updatedAt = {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      };
    }

    const stockHistory = await StockHistory.find(query).populate('itemId');
    res.status(200).json(stockHistory);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching stock history', error });
  }
});



 // Fetch latest stock entries for all items
router.get('/latest', async (req, res) => {
  const { startDate, endDate } = req.query;

  try {
    const query = {};

    if (startDate && endDate) {
      query.updatedAt = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      };
    }

    const latestStocks = await Stock.aggregate([
      { $sort: { updatedAt: -1 } },
      { $group: { _id: "$itemId", latestStock: { $first: "$$ROOT" } } },
      { $replaceRoot: { newRoot: "$latestStock" } }
    ]);

    const populatedStocks = await Stock.populate(latestStocks, { path: 'itemId' });

    res.status(200).json(populatedStocks);
  } catch (error) {
    console.error('Error fetching latest stock entries:', error);
    res.status(400).json({ message: 'Error fetching latest stock entries', error });
  }
});



module.exports = router;
