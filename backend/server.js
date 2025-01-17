const express = require('express');
const db = require('./db');
const cors = require('cors');
const { protect, admin } = require('./middleware/authMiddleware');
const FoodItem = require('./models/Foodmodel');   


const app = express();
app.use(express.json());
app.use(cors()); 

const fooditemsRoute = require('./routes/fooditemsRoute');
const userRoute=require('./routes/userRoute');
const orderRoute=require('./routes/orderRoute');
const adminRoute=require('./routes/adminActionsRoute');


// Sample route
app.get('/', (req, res) => {
  res.send('Welcome to the Restaurant Order System API');
});

app.use('/api/fooditems', fooditemsRoute);
app.use('/api/users',userRoute);
app.use('/api/orders', protect,orderRoute);
app.use('/api/adminActions', protect,adminRoute);

/*
app.use('/api/admin', protect, admin, (req, res) => {
  res.send('Admin route');
});
*/

const PORT = process.env.PORT || 5000;
// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});