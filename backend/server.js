const express = require('express');
const db = require('./db');
const FoodItem = require('./models/EatEase');   


const app = express();
app.use(express.json());


// Sample route
app.get('/', (req, res) => {
  res.send('Welcome to the Restaurant Order System API');
});

app.get('/api/fooditems', async (req, res) => {
  try {
    const foodItems = await FoodItem.find();
    res.json(foodItems);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

const PORT = process.env.PORT || 5000;
// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});