// models/LogisticRequest.js
const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  itemName: { type: String, required: true },
  quantityRequested: { type: Number, required: true },
  quantityReceived: { type: Number },
  observation: { type: String },
});

const logisticRequestSchema = new mongoose.Schema({
  district: { type: String, required: true },
  healthFacility: { type: String, required: true },
  department: { type: String, required: true },
  items: [itemSchema],
  signature: { type: String, required: true },
  date: { type: Date, required: true },
  hodSignature: { type: String },
  logisticSignature: { type: String },
  ackReceiptSignature: { type: String },
  dafSignature: { type: String },
});

module.exports = mongoose.model('LogisticRequest', logisticRequestSchema);
