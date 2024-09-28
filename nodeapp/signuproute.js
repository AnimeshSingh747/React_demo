const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('./models/User');  // User model
const bcrypt = require('bcryptjs');
const app = express();

app.use(express.json());

const JWT_SECRET = 'your_secret_key';

// Signup Route
app.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ error: 'User already exists' });

    // Create a new user
    const newUser = new User({ username, email, password });
    await newUser.save();

    // Generate JWT Token
    const token = jwt.sign({ id: newUser._id, email: newUser.email }, JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({ message: 'User registered', token });
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
});
