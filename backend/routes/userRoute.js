// filepath: /c:/Users/rashmika/Desktop/fullstack-projects/restaurant-online_order-system/backend/routes/userRoute.js
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

// Registration route
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = new User({
      name,
      email,
      password,
      isAdmin: false, // Default to non-admin
    });

    const savedUser = await user.save();

    const token = jwt.sign(
      { _id: savedUser._id, isAdmin: savedUser.isAdmin },
      process.env.JWT_SECRET,
      { expiresIn: '30d' }
    );

    res.status(201).json({
      _id: savedUser._id,
      name: savedUser.name,
      email: savedUser.email,
      isAdmin: savedUser.isAdmin,
      token,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Login route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  console.log('Request body:', req.body);

  try {
    const user = await User.findOne({ email });
    console.log('User found:', user);

    if (user && (await user.matchPassword(password))) {
      const currentUser = {
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        _id: user._id,
      };

      const token = jwt.sign(
        { _id: user._id, isAdmin: user.isAdmin },
        process.env.JWT_SECRET,
        { expiresIn: '30d' }
      );

      console.log('Generated token:', token);

      res.json({
        ...currentUser,
        token,
      });
    } else {
      console.log('Invalid credentials');
      return res.status(400).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    console.log('Error:', error.message);
    return res.status(400).json({ message: error.message });
  }
});

module.exports = router;