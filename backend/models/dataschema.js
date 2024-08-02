const mongoose = require('mongoose');


const DataSchema = new mongoose.Schema({
  name: String,
  username: String, // Change to String if your data has it as a string
  country: String, // Change to String if your data has it as a string
  phone: String    // Change to String if your data has it as a string
});

const DataModel = mongoose.model('Data', DataSchema);

module.exports = DataModel;
