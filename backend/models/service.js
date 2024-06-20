// models/service.js
const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  departmentId:{ type: mongoose.Schema.Types.ObjectId, ref: 'department', required: true },
  service_name: { type: String, required: true },
  
});

const Service = mongoose.model('service', serviceSchema);

module.exports = Service;
