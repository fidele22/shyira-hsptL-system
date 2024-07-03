// models/position.js
const mongoose = require('mongoose');

const positionSchema = new mongoose.Schema({
  positionName: { type: String, required: true },
 
});

const Position = mongoose.model('Position', positionSchema);

module.exports = Position;
