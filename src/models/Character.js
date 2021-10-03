const { DataTypes } = require('sequelize');
const db = require('../database/database');

const Character = db.define('characters', {
  name: {
    type: DataTypes.STRING,
  },
  age: {
    type: DataTypes.INTEGER,
  },
  weight: {
    type: DataTypes.MEDIUMINT,
  },
  history: {
    type: DataTypes.STRING,
  },
  image: {
    type: DataTypes.STRING,
  },
});

module.exports = Character;
