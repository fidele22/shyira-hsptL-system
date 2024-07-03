const mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema({
  departmentName: {
    type: String,
    required: true,
    unique: true, // Ensure department names are unique
  },
});

module.exports = mongoose.model('Department', departmentSchema);
