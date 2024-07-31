// models/item.js
const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  maximum:{type:Number,required:true},
  minimum:{type:Number,required:true}
});

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;
