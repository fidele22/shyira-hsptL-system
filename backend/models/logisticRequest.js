// models/requestService.js
const mongoose = require('mongoose');

const logisticRequestSchema = new mongoose.Schema({

  userId:{ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  itemId:{ type: mongoose.Schema.Types.ObjectId, ref: 'item', required: true },
  supplierName:{type:String,required:true},
  unitOfMeasurement:{type:String,required:true},
  quantity:{type:String,required:true},
  pricePerUnit:{type:String,required:true},
  created:{type: Date,required: true,default: Date.now},
  status:{type: String, required:true}
  
});

const logisticRequest = mongoose.model('logisticRequest', logisticRequestSchema);

module.exports = logisticRequest;
