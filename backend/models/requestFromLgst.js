const mongoose = require('mongoose');

const forwardedRequestSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  department: String,
  items: [
    {
      itemId: { type: mongoose.Schema.Types.ObjectId, ref: 'StockItems', required: true },
      itemName: String,
      quantityRequested: Number,
      quantityReceived: Number,
      observation: String
    }
  ],
  hodName: { type: String, required: false},
  hodSignature: { type: String },

  logisticName: { type: String }, // Add this field
  logisticSignature: { type: String }, // Add this field
  date: { type: Date, required: true },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ForwardedRequest', forwardedRequestSchema);