const express = require('express');
const router = express.Router();
const User = require('../models/userModel'); 

router.post('/register', async (req, res) => {
    
    const { name, email, password } = req.body;
    
  
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Please fill in all fields' });
    }
  
    try {
      const newUser = new User({ name, email, password }); // Create a new user document
      await newUser.save(); // Save the document to the database
      res.send("User Registered Successfully"); // Send a success response
    } catch (error) {
      return res.status(400).json({ message: error.message }); // Handle any errors
    }
  });


// Login route

router.post('/login', async (req, res) => {

    const { user } = req.body;
    const { email, password } = user;
    console.log(req.body);
    
    if (!email || !password) {
      return res.status(400).json({ message: 'Please fill in all fields' });
    }
    
    try {
      const user = await User.find({ email, password });
  
      if (user.length > 0) {
        const currentUser = { name: user[0].name,
             email: user[0].email,
             isAdmin: user[0].isAdmin,
             _id: user[0]._id
             };

         res.send(currentUser);
      } else {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
    } catch (error) {
      return res.status(400).json({ message: error.message });
}
      
     });


module.exports = router;