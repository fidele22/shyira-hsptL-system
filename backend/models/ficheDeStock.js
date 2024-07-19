const mongoose = require('mongoose');

const stockSchema = new mongoose.Schema({
  itemId: { type: mongoose.Schema.Types.ObjectId, ref: 'Item', required: true },
  entry: {
    quantity: { type: Number, default: 0 },
    pricePerUnit: { type: Number, default: 0 },
    totalAmount: { type: Number, default: 0 }
  },
  exit: {
    quantity: { type: Number, default: 0 },
    pricePerUnit: { type: Number, default: 0 },
    totalAmount: { type: Number, default: 0 }
  },
  balance: {
    quantity: { type: Number, default: 0 },
    pricePerUnit: { type: Number, default: 0 },
    totalAmount: { type: Number, default: 0 }
  }
},{ timestamps: true });

const Stock = mongoose.model('Stock', stockSchema);

module.exports = Stock;
