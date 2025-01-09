
const mongoose = require('mongoose');

const eatEaseSchema = new mongoose.Schema({
  // Define your schema fields here
  name: { type: String, required: true },
  varients: { type: Array, required: true },
  prices: { type: Object, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
});

const FoodItem = mongoose.model('fooditem', eatEaseSchema);

module.exports = FoodItem;