const mongoose = require('mongoose');

const eatEaseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  variants: {
    type: [String], // Array of strings to represent the variants
    required: true,
  },
  prices: {
    type: Object,
    required: true,
  },
  category: {
    type: String,
    required: true,
   
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