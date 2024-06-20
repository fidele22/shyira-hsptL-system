// models/position.js
const mongoose = require('mongoose');

const positionSchema = new mongoose.Schema({
  positionName: { type: String, required: true },
  serviceId:{ type: mongoose.Schema.Types.ObjectId, ref: 'service', required: true },
});

const Position = mongoose.model('Position', positionSchema);

module.exports = Position;
