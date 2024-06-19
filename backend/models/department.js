// models/item.js
const mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema({
  departmentName: { type: String, required: true },
  
});

const department = mongoose.model('department', departmentSchema);

module.exports = department;
