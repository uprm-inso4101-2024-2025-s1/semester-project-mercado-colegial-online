import mongoose from 'mongoose';
import User from './user.js';
import Item from './item.js';

const sellSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    validate: {
      validator: async function(value) {
        const count = await mongoose.model('User').countDocuments({_id: value});
        return count > 0;
      },
      message: 'User not found'
    }
  },
  item_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Item',
    required: true,
    validate: {
      validator: async function (value) {
        return Item.countDocuments({_id: value}).then(count => count > 0);
      },
      message: 'Item not found'
    }
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
  collection: 'sells', // Ensure the collection name is correct and typically lowercase
});

const Sell = mongoose.model('Sell', sellSchema);

export default Sell;
