const mongoose = require('mongoose');

const approvedRequestSchema = new mongoose.Schema({
  district: String,
  healthFacility: String,
  department: String,
  items: [
    {
      
      itemName: String,
      quantityRequested: Number,
      quantityReceived: Number,
      observation: String,
    },
  ],
  signature: String,
  hodSignature: String,
  logisticSignature: String,
  ackReceiptSignature: String,
  dafSignature: String,
}, { timestamps: true });

module.exports = mongoose.model('ApprovedRequest', approvedRequestSchema);
