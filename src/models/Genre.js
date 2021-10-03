const { DataTypes } = require('sequelize');
const db = require('../database/database');

const Genre = db.define('genres', {
  name: {
    type: DataTypes.STRING,
  },
});

module.exports = Genre;
