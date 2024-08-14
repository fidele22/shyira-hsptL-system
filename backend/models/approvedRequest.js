const mongoose = require('mongoose');

const approvedRequestSchema = new mongoose.Schema({
 
  department: String,
  items: [
    {
      itemId: { type: mongoose.Schema.Types.ObjectId, ref: 'StockItems', required: true },
      itemName: String,
      quantityRequested: Number,
      quantityReceived: Number,
      observation: String,
    },
  ],
  hodName: { type: String, required: false},
  hodSignature: String,
  clicked: { type: Boolean, default: false },
  
}, { timestamps: true });

module.exports = mongoose.model('ApprovedRequest', approvedRequestSchema);
