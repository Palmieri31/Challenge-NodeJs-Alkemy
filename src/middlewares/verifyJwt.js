const jwt = require('jsonwebtoken');
const config = require('../config');
const User = require('../models/User');

module.exports.verifyToken = async (req, res, next) => {
  try {
    const token = req.headers['x-access-token'];
    if (!token) {
      res.status(403).json({ message: 'No token provided' });
      return;
    }
    const decoded = jwt.verify(token, config.SECRET);
    const { id } = decoded;
    req.userId = id;

    const userFound = User.findByPk(req.userId);
    if (!userFound) {
      res.status(404).json({ message: 'no user found' });
      return;
    }

    next();
  } catch (error) {
    res.status(404).json({ message: 'Unauthorized' });
  }
};
