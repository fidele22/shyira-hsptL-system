const mongoose = require('mongoose');

const approvedRequestSchema = new mongoose.Schema({
 
  department: String,
  items: [
    {
      itemId: { type: mongoose.Schema.Types.ObjectId, ref: 'Item', required: true },
      itemName: String,
      quantityRequested: Number,
      quantityReceived: Number,
      observation: String,
    },
  ],
  hodName: { type: String, required: false},
  hodSignature: String,
  
}, { timestamps: true });

module.exports = mongoose.model('ApprovedRequest', approvedRequestSchema);
