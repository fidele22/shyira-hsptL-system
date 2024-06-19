// models/item.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

  positionId:{ type: mongoose.Schema.Types.ObjectId, ref: 'position', required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phone:{type:Number,required:true},
  signature:{type:String}

});

const User = mongoose.model('User', userSchema);

module.exports = User;
