// models/user.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  positionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Position',required:true},
  serviceId:{ type: mongoose.Schema.Types.ObjectId, ref: 'Service', required: true },
  departmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Department', required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phone: { type: String, required: true },
  email:{type:String,required:true},
  password:{type:String,required: true},
  signature: { type: String, required: true },
  role:{type: String,required:true}
},
{ timestamps: true });

module.exports = mongoose.model('User', userSchema);

