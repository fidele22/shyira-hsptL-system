const mongoose = require('mongoose');
// Destination model
const destinationSchema = new mongoose.Schema({
    destinationname: { type: String, required: true },
  });
  
  module.exports = mongoose.model('Destination', destinationSchema);
  