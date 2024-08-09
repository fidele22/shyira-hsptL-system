const mongoose = require('mongoose');

const StockItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  quantity: { type: Number, required: true },  // Changed to Number
  pricePerUnit: { type: Number, required: true },  // Changed to Number
  totalAmount: { type: Number, required: true },   // Corrected field name and changed to Number
});

const StockItem = mongoose.model('StockItem', StockItemSchema);

module.exports = StockItem;
