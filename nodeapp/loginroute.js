// Login Route
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Find the user by email
      const user = await User.findOne({ email });
      if (!user) return res.status(400).json({ error: 'User not found' });
  
      // Check if the password is correct
      const isPasswordCorrect = await bcrypt.compare(password, user.password);
      if (!isPasswordCorrect) return res.status(400).json({ error: 'Invalid credentials' });
  
      // Generate JWT Token
      const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });
  
      res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
      res.status(500).json({ error: 'Something went wrong' });
    }
  });
  