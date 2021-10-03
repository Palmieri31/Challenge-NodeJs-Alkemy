const { DataTypes } = require('sequelize');
const db = require('../database/database');
const Genre = require('./Genre');
const Movie = require('./Movie');

const MoviesxGenres = db.define('moviesxgenres', {
  movieId: {
    type: DataTypes.INTEGER,
  },
  genreId: {
    type: DataTypes.INTEGER,
  },
});

Movie.belongsToMany(Genre, { through: MoviesxGenres });
Genre.belongsToMany(Movie, { through: MoviesxGenres });

module.exports = MoviesxGenres;
