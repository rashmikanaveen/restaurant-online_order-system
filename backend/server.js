const express = require('express');
const db = require('./db');

const FoodItem = require('./models/Foodmodel');   


const app = express();
app.use(express.json());


const fooditemsRoute = require('./routes/fooditemsRoute');

// Sample route
app.get('/', (req, res) => {
  res.send('Welcome to the Restaurant Order System API');
});

app.use('/api/fooditems',fooditemsRoute);

const PORT = process.env.PORT || 5000;
// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});