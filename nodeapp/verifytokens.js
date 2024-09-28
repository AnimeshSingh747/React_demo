// Middleware to verify token
const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
  
    if (!token) return res.status(401).json({ error: 'Access denied, no token provided' });
  
    try {
      const verified = jwt.verify(token, JWT_SECRET);
      req.user = verified; // Attach user info to request
      next();
    } catch (error) {
      res.status(400).json({ error: 'Invalid token' });
    }
  };
  
  // Protected Route
  app.get('/protected', verifyToken, (req, res) => {
    res.status(200).json({ message: 'Access granted', user: req.user });
  });
  