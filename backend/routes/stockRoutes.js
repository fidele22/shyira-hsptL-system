const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Stock = require('../models/ficheDeStock');
const Item = require('../models/item');
const StockHistory = require('../models/stockHistory');
const ApprovedRequest = require('../models/approvedRequest');

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

// Fetch all stock entries with item names
router.get('/', async (req, res) => {
try {
const stocks = await Stock.find().populate('itemId', 'name');
res.json(stocks);
} catch (error) {
res.status(500).json({ message: 'Error fetching stocks', error });
}
});


// Update stock entry
router.put('/:id', async (req, res) => {
const { id } = req.params;
const { entry, exit } = req.body;

try {
const stock = await Stock.findById(id);
if (!stock) {
return res.status(404).send('Stock entry not found');
}

// Update the stock entry and balance
     if (entry) {
     stock.entry = {
     quantity: entry.quantity || O,
     pricePerUnit: entry.pricePerUnit || stock.entry.pricePerUnit,
     totalAmount: entry.quantity * (entry.pricePerUnit || stock.entry.pricePerUnit)
     };
     
     stock.balance.quantity += stock.entry.quantity ,
     stock.balance.totalAmount += stock.entry.totalAmount,
     stock.balance.pricePerUnit = stock.entry.pricePerUnit; // Update price per unit based on the last entry
     }
     if (exit) {
     stock.exit = {
     quantity: exit.quantity || stock.exit.quantity,
     pricePerUnit: stock.entry.pricePerUnit,
     totalAmount: exit.quantity * (exit.pricePerUnit || stock.exit.pricePerUnit)
     };
     
     stock.balance.quantity -= stock.exit.quantity,
     stock.balance.totalAmount -= stock.exit.totalAmount, 
     stock.balance.pricePerUnit = stock.entry.pricePerUnit; // Update price per unit based on the last exit
     }

await stock.save();

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

// Fetch stock history for a specific month
router.get('/history/:year/:month', async (req, res) => {
const { year, month } = req.params;
const startDate = new Date(year, month - 1, 1);
const endDate = new Date(year, month, 1);

try {
const stockHistory = await StockHistory.find({
updatedAt: {
$gte: startDate,
$lt: endDate
}
}).populate('itemId', 'name');
res.json(stockHistory);
} catch (error) {
res.status(500).json({ message: 'Error fetching stock history', error });
}
});

module.exports = router;

