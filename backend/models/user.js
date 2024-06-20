// models/user.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  positionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Position' },
  departmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Department', required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phone: { type: String, required: true },
  password:{type:String,required: true},
  signature: { type: String, required: true },
  
},
{ timestamps: true });

module.exports = mongoose.model('User', userSchema);

