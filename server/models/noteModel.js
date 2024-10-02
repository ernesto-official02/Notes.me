const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables

// Connect to MongoDB using the URI from the .env file
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log("Connected to MongoDB successfully");
})
.catch((error) => {
  console.error("MongoDB connection error:", error);
});

// Define the notes schema
const notesSchema = new mongoose.Schema({
  title: String,
  description: String,
  content: String,
  isImportant: Boolean,
  uploadedBy: String,
  date: {
    type: Date,
    default: Date.now
  }
});

// Create and export the Notes model
const Notes = mongoose.model("Notes", notesSchema);
module.exports = Notes;
