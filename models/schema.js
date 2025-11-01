// schema.js

const mongoose = require('mongoose');

// --------------------
// Book Schema
// --------------------
const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Book title is required']
  },
  author: {
    type: String,
    required: [true, 'Author name is required']
  },
  isbn: {
    type: String,
    required: [true, 'ISBN is required'],
    unique: true
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['fiction', 'non-fiction', 'comics', 'biography']
  },
  copies: {
    type: Number,
    required: [true, 'Total number of copies is required'],
    min: [1, 'At least one copy must exist']
  },
  available: {
    type: Number,
    default: function () {
      // Set available equal to copies by default
      return this.copies;
    }
  }
});

// --------------------
// Member Schema
// --------------------
const memberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Member name is required']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address']
  },
  joinDate: {
    type: Date,
    default: Date.now
  },
  booksIssued: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Book'
    }
  ]
});

// --------------------
// Compile Schemas into Models
// --------------------
const Book = mongoose.model('Book', bookSchema);
const Member = mongoose.model('Member', memberSchema);

// --------------------
// Export Models
// --------------------
module.exports = { Book, Member };
