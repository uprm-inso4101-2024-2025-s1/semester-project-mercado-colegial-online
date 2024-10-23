import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  review_id: {
    type: mongoose.Schema.Types.ObjectId,
    default: () => new mongoose.Types.ObjectId(),
    index: true,
    unique: true,
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

  rating: {
    type: Number,
    required: true,
    min: 1,  
    max: 5,  
  },

  comment: {
    type: String,
    maxlength: 1000,
  },

  title: {
    type: String,
    maxlength: 255,
  },
}, {
  timestamps: true 
});

const Review = mongoose.model('Review', reviewSchema);

export default Review;
