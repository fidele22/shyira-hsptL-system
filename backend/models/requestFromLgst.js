const mongoose = require('mongoose');

const forwardedRequestSchema = new mongoose.Schema({
  district: String,
  healthFacility: String,
  department: String,
  items: [
    {
      itemName: String,
      quantityRequested: Number,
      quantityReceived: Number,
      observation: String
    }
  ],
  signature: String,
  hodSignature: String,
  logisticSignature: String,
  ackReceiptSignature: String,
  dafSignature: String,
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ForwardedRequest', forwardedRequestSchema);
