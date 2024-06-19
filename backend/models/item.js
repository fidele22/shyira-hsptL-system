// models/item.js
const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  item_name: { type: String, required: true },
  item_type: { type: String, required: true },
  price: { type: Number, required: true }
});

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;
