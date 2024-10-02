const mongoose = require('mongoose');

// Ensure you load your environment variables
require('dotenv').config();

// Define the user schema
const userSchema = new mongoose.Schema({
  username: String,
  name: String,
  email: String,
  password: String,
  profilePic: String,
  date: {
    type: Date,
    default: Date.now
  }
});

// Create the model
const User = mongoose.model('User', userSchema);

// Export the model
module.exports = User;
