const mongoose = require('mongoose');

// Car model
const carSchema = new mongoose.Schema({
  plaque: { type: String, required: true, unique: true },
});

module.exports = mongoose.model('CarPlaque', carSchema);


