const express = require('express');


const app = express();
app.use(express.json());


// Sample route
app.get('/', (req, res) => {
  res.send('Welcome to the Restaurant Order System API');
});

const PORT = process.env.PORT || 5000;
// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});