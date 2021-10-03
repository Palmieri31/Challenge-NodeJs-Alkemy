const jwt = require('jsonwebtoken');
const sgMail = require('@sendgrid/mail');
const User = require('../models/User');
const config = require('../config');

sgMail.setApiKey(config.SENDGRID_API_KEY);

module.exports.register = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const NewUser = new User({
      email,
      password: await User.encryptPassword(password),
    });
    const saveUser = await NewUser.save();

    const token = jwt.sign({ id: saveUser.id }, config.SECRET, {
      expiresIn: '24h', // it will be expired after 24 hours
    });

    const msg = {
      to: NewUser.email,
      from: 'user@hotmail.com',
      subject: 'Register to Disney World',
      text: 'you can start to use Disney World API',
      html: '<strong>enjoy our website!</strong>',
    };

    await sgMail.send(msg);
    res.status(200).json({ token });
  } catch (error) {
    next(error);
  }
};

module.exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const userFound = await User.findOne({
      where: {
        email,
      },
    });

    if (!userFound) {
      res.status(400).json({ message: 'User not found' });
      return;
    }

    const matchPassword = await User.comparePassword(password, userFound.password);

    if (!matchPassword) {
      res.status(401).json({ token: null, message: 'Invalid password' });
      return;
    }

    const token = jwt.sign({ id: userFound.id }, config.SECRET, {
      expiresIn: '24h',
    });

    res.json({ token });
  } catch (error) {
    next(error);
  }
};
