const User = require('../models/User');

module.exports.ckeckDuplicateEmail = async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (user) {
      res.status(400).json({ message: 'The email already exists' });
      return;
    }
    next();
  } catch (error) {
    next(error);
  }
};
