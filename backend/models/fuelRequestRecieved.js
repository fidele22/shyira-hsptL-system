const mongoose = require('mongoose');

const FuelRequisitionRecievedSchema = new mongoose.Schema({
originalRequisitionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'FuelRequisition',
    required: true,
  },
  requesterName: {
    type: String,
    required: true,
  },
  carPlaque: {
    type: String,
    required: true,
  },
  quantityRequested: {
    type: Number,
    required: true,
  },
  kilometers: {
    type: Number,
    required: true,
  },
  quantityReceived: {
    type: Number,
  },
  destination: {
    type: String,
  },
  modifyOption: {
    type: String,
  },
  hodName: {
    type: String,
  },
  verifiedBy: {
    type: String,
  },
  forwardDate: {
    type: Date,
    default: Date.now,
  },

});

module.exports = mongoose.model('RecievedFuelRequisition', FuelRequisitionRecievedSchema);
