const mongoose = require('mongoose');

const stockHistorySchema = new mongoose.Schema({
  itemId: { type: mongoose.Schema.Types.ObjectId, ref: 'Item', required: true },
  quantity: Number,
  pricePerUnit: Number,
  totalAmount: Number,
  date: { type: Date, default: Date.now }
});

const StockHistory = mongoose.model('StockHistory', stockHistorySchema);

module.exports = StockHistory;
