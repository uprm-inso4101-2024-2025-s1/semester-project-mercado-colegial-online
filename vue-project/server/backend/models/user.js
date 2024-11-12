import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  // Mongoose automatically creates an `_id` field (ObjectId), so no need to add `user_id`
  
  username: {
    type: String,
    required: false,
    trim: true,
    minlength: 3,
    maxlength: 50,
  },
 
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    match: [/\S+@\S+\.\S+/, 'is invalid'], // Simple email validation
  },
 
  password: {
    type: String,
    required: true,
    minlength: 8, // Enforcing password length
  },

  salt: {
    type: String,
    required: true,
  },

  student_num: {
    type: Number,
    required: true,
    unique: true, // Assuming each student number is unique
  },
 
  role: {
    type: String,
    required: true,
    enum: ['student', 'admin', 'guest'], // Optional role validation
  },

  card_num: {
    type: String, // Changed to string to avoid losing leading zeros
    required: false,
    minlength: 13,
    maxlength: 16,
  },

  card_name: {
    type: String,
    required: false,
    trim: true,
  },

  cvv: {
    type: String, // Changed to string for leading zeros and consistent length
    required: false,
    minlength: 3,
    maxlength: 3,
  },

  card_zip: {
    type: String, // Changed to string for leading zeros
    required: false,
    minlength: 4,
    maxlength: 5, // Zip codes can vary (US zip codes have 5 digits)
  },

  shipping_zip: {
    type: String, // Changed to string for leading zeros
    required: false,
    minlength: 4,
    maxlength: 5,
  },

  addr_line_1: {
    type: String,
    required: false,
    trim: true,
  },

  addr_line_2: {
    type: String,
    trim: false,
    default: '', // Optional field
  },

  city: {
    type: String,
    required: false,
    trim: true,
  },

}, {
  timestamps: true  // Automatically create `createdAt` and `updatedAt` fields
});

export default mongoose.model('User', userSchema); 
