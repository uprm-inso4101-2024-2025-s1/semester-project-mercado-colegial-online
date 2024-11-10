const mongoose = require('mongoose');
const User = require('./user');  //Uses the existing User model
const Item = require('./item');  //Uses the existing Item model

const sellSchema = new mongoose.Schema({
  sell_id: {
    type: Number,
    autoIncrement: true,  
    primaryKey: true
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',  // References the User model
    required: true
  },
  item_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Item',  // References the Item model
    required: true
  },
  quantity: {
    type: Number,
    default: 1
  },
  price: {
    type: Number,
    required: true
  },
  date_listed: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true,  // Enable auto-generated timestamps 
  collection: 'Sell'  
});

const Sell = mongoose.model('Sell', sellSchema);

module.exports = Sell;
