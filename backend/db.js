

const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();


const password = process.env.DB_PASSWORD
const url = `mongodb+srv://rashmikanaveen734:${password}@cluster0.rt8uw.mongodb.net/EatEase`




mongoose.set('strictQuery', false);

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 30000 // Increase timeout to 30 seconds
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

mongoose.connection.on('error', err => {
  console.error('MongoDB connection error:', err);
});


// Close the connection when the process ends
process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log('MongoDB connection closed');
    process.exit(0);
  });
});

// Import the EatEase model
const EatEase = require('./models/Foodmodel');