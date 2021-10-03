/* eslint-disable arrow-body-style */
/* eslint-disable indent */
/* eslint-disable no-return-await */
const { DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');
const db = require('../database/database');

const User = db.define('users', {
  email: {
    type: DataTypes.STRING,
  },
  password: {
    type: DataTypes.STRING,
  },
});

User.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

User.comparePassword = async (password, receivedPassword) => {
    return await bcrypt.compare(password, receivedPassword); // return true or false if are equal
};

module.exports = User;
