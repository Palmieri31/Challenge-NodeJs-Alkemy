const { DataTypes } = require('sequelize');
const db = require('../database/database');

const Movie = db.define('movies', {
  title: {
    type: DataTypes.STRING,
  },
  release_date: {
    type: DataTypes.DATE,
  },
  qualification: {
    type: DataTypes.TINYINT,
  },
  image: {
    type: DataTypes.STRING,
  },
});

module.exports = Movie;
