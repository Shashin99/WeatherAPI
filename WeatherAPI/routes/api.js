const express = require('express');
const router = express.Router();
const User = require('../models/User');
const fetchWeatherData = require('../utils/fetchWeatherData');

// Create a new user
router.post('/add', async (req, res) => {
  try {
    const { email, location } = req.body;
    // Check if the user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const newUser = new User({
      email,
      location,
    });

    await newUser.save();

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// Update user's location
router.put('/users/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const { location } = req.body;

    const user = await User.findByIdAndUpdate(userId, { location }, { new: true });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'Location updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});


router.get('/users/:id/weather/:date', async (req, res) => {
    try {
      const userId = req.params.id;
      const date = req.params.date;
  
      const user = await User.findById(userId);
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Assuming fetchWeatherData is a function that takes user's location and date as parameters
      const weatherData = await fetchWeatherData(user.location, date);
  
      if (!weatherData) {
        return res.status(404).json({ message: 'Weather data not found for the given date' });
      }
  
      res.status(200).json({ weatherData });
    } catch (error) {
    if (error.response && error.response.status === 404) {
        return res.status(404).json({ message: 'Location not found in OpenWeatherMap' });
      } else {
        console.error('Error in the route handler:', error);
        res.status(500).json({ message: 'Server Error' });
      }
    }
  });

module.exports = router;