const jwt = require('jsonwebtoken');
const User = require('../models/user');

const authenticate = async (req, res, next) => {
  const token = req.header('Authorization').replace('Bearer ', '');
  try {
    const decoded = jwt.verify(token, 'your_jwt_secret');
    req.user = await User.findById(decoded.id);
    if (!req.user) throw new Error();
    next();
  } catch (error) {
    res.status(401).json({ message: 'Please authenticate' });
  }
};

module.exports = authenticate;
