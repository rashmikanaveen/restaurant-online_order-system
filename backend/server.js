const express = require('express');
const db = require('./db');
const cors = require('cors');

const FoodItem = require('./models/Foodmodel');   


const app = express();
app.use(express.json());
app.use(cors()); 

const fooditemsRoute = require('./routes/fooditemsRoute');
const userRoute=require('./routes/userRoute');
const orderRoute=require('./routes/orderRoute');


// Sample route
app.get('/', (req, res) => {
  res.send('Welcome to the Restaurant Order System API');
});

app.use('/api/fooditems',fooditemsRoute);
app.use('/api/users',userRoute);
app.use('/api/orders',orderRoute);


const PORT = process.env.PORT || 5000;
// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});