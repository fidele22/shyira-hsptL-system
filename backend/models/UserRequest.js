const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  itemId: { type: mongoose.Schema.Types.ObjectId, ref: 'StockItems', required: true },
  itemName: { type: String },
  quantityRequested: { type: Number, default: 0 },
  quantityReceived: { type: Number },
  observation: { type: String },
});

const UserRequestSchema = new mongoose.Schema({
  department: { type: String, required: true },
  items: [itemSchema],
  hodName: { type: String, required: true },
  hodSignature: { type: String },
  clicked: { type: Boolean, default: false },
  logisticName: { type: String }, // Add this field
  logisticSignature: { type: String }, // Add this field

  date: { type: Date, required: true },
});

// Pre save middleware to set quantityReceived to quantityRequested if not provided
UserRequestSchema.pre('save', function(next) {
  this.items.forEach(item => {
    if (item.quantityReceived === undefined || item.quantityReceived === null) {
      item.quantityReceived = item.quantityRequested;
    }
  });
  next();
});

module.exports = mongoose.model('UserRequest', UserRequestSchema);
