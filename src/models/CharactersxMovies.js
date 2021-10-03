const { DataTypes } = require('sequelize');
const db = require('../database/database');
const Character = require('./Character');
const Movie = require('./Movie');

const CharactersxMovies = db.define('charactersxmovies', {
  characterId: {
    type: DataTypes.INTEGER,
  },
  movieId: {
    type: DataTypes.INTEGER,
  },
});

Character.belongsToMany(Movie, { through: CharactersxMovies });
Movie.belongsToMany(Character, { through: CharactersxMovies });

module.exports = CharactersxMovies;
