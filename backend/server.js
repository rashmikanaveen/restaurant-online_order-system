const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const db = require('./db');
const cors = require('cors');
const { protect, admin } = require('./middleware/authMiddleware');
  


const app = express();
const server = http.createServer(app);

const io = socketIo(server, {
  cors: {
    origin: '*', // Adjust the URL to match your frontend URL
    methods: ['GET', 'POST'],
    allowedHeaders: ['Authorization'],
    credentials: true,
  },
});
app.use(express.json());
app.use(cors()); 

const fooditemsRoute = require('./routes/fooditemsRoute');
const userRoute=require('./routes/userRoute');
const orderRoute=require('./routes/orderRoute')(io);
const adminRoute=require('./routes/adminActionsRoute');


// Sample route
app.get('/', (req, res) => {
  res.send('Welcome to the Restaurant Order System API');
});

app.use('/api/fooditems', fooditemsRoute);
app.use('/api/users',userRoute);
app.use('/api/orders', protect,orderRoute);
app.use('/api/adminActions', protect,admin,adminRoute);

io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});


const PORT = process.env.PORT || 3000;
// Start the server
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


