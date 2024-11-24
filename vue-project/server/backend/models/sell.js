import mongoose from 'mongoose';
import User from './user.js';
import Item from './item.js';

const sellSchema = new mongoose.Schema({
  sell_id: {
    type: Number,
    autoIncrement: true,
    primaryKey: true,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  item_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Item',
    required: true,
  },
  quantity: {
    type: Number,
    default: 1,
  },
  price: {
    type: Number,
    required: true,
  },
  date_listed: {
    type: Date,
    default: Date.now,
  },
}, {
  timestamps: true,
  collection: 'Sell',
});

const Sell = mongoose.model('Sell', sellSchema);

// Use ES Module export
export default Sell;
