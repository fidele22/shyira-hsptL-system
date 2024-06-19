// models/requestService.js
const mongoose = require('mongoose');

const serviceRequestSchema = new mongoose.Schema({

  userId:{ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  itemId:{ type: mongoose.Schema.Types.ObjectId, ref: 'item', required: true },
  quantityRequested:{type:Number,required:true},
  quantityReceived:{type:Number,required:true},
  receptionDate:{type:Date,required:true,},
  created:{type: Date,required: true,default: Date.now},

  status:{type: String, required:true}},
  {
    timestamps: true // This will add `createdAt` and `updatedAt` fields
  });


const ServiceRequest = mongoose.model('ServiceRequest', serviceRequestSchema);

module.exports = ServiceRequest;
