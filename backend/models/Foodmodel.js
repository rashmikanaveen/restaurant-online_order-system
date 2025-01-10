const mongoose = require('mongoose');

const eatEaseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  varients: {
    type: [String], // Array of strings to represent the variants
    required: true,
  },
  prices: {
    type: Map, // Map to associate each variant with its price
    of: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: ['veg', 'nonveg', 'short-eats', 'sweets', 'drinks'], // Restrict to valid categories
  },
  image: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const FoodItem = mongoose.model('FoodItem', eatEaseSchema);

module.exports = FoodItem;