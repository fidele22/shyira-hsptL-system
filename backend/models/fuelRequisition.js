const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const fuelRequisitionSchema = new Schema({
  requesterName: {
    type: String,
    required: true
  },
  carPlaque: {
    type: String,
    required: true
  },
  kilometers: {
    type: Number,
    required: true
  },
  quantityRequested: {
    type: Number,
    required: true
  },
  quantityReceived: {
    type: Number,
    default: 0
  },
  destination: {
    type: String,
    required: false,
  },
  remainingliters: {
    type: String,
    required: true
  },
  average: {
    type: String,
    required: true
  },
  reason: {
    type: String,
    
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  hodName: { type: String, required: true },
  hodSignature: { type: String },
  clicked: { type: Boolean, default: false }, 
});

module.exports = mongoose.model('FuelRequisition', fuelRequisitionSchema);
