// models/item.js
const mongoose = require('mongoose');

const assetsStockSchema = new mongoose.Schema({

  item: { type: String, required: true },
  item_type: { type: String, required: true },
  acquisitionDate:{type:Date},
  supplierName:{type:String,required:true},
  guarantee:{type:String},
  serialNumber:{type:String},
  manufacturer:{type:String},
  model:{type:String},
  assetCategory:{type:String},
  codeNo:{type:String},
  value:{type:String},
  depreciationPerYear:{type:String},
  accumulatedDepreciation:{type:String},
  netbookValue:{type:String},
  disposalDate:{type:String},
  comment:{type:String}


});

const Assets = mongoose.model('Assets',assetsStockSchema);

module.exports = Assets;
