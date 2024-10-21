import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({

  item_id: {
    type: mongoose.Schema.Types.ObjectId,
    default: () => new mongoose.Types.ObjectId(), 
    index: true,
    unique: true,
  },

  item_name: {
    type: String,
    required: true,
    maxlength: 255,  
  },
 
  price: {
    type: Number,
    required: true,
    min: 0,  // Price cannot be negative
  },
 
  stock: {
    type: Number,
    required: true,
    min: 0,  // Stock cannot be negative
  },
 
  description: {
    type: String,
    maxlength: 1000,  
  },
  category: {
    type: String,
    maxlength: 1000,  
  },
  size: {
    type: String,
    maxlength: 1000,  
  },
}, {
  timestamps: true  
});

// Create and export the model based on the schema
const Item = mongoose.model('Item', itemSchema);

export default Item; 