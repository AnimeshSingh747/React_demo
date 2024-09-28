const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('./models/User'); // Assume you have this User model

const app = express();
const JWT_SECRET = 'your_secret_key';

app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/auth_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

// Signup route
app.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ error: 'User already exists' });

    const newUser = new User({ username, email, password });
    await newUser.save();

    const token = jwt.sign({ id: newUser._id, email: newUser.email }, JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({ message: 'User registered', token });
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
});

// Login route
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: 'User not found' });

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) return res.status(400).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
});

// Verify token middleware
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) return res.status(401).json({ error: 'No token provided' });

  try {
    const verified = jwt.verify(token, JWT_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).json({ error: 'Invalid token' });
  }
};

// Protected route
app.get('/protected', verifyToken, (req, res) => {
  res.status(200).json({ message: 'Access granted', user: req.user });
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
