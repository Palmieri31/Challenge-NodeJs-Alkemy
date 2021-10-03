/* eslint-disable no-await-in-loop */
/* eslint-disable camelcase */
const Movie = require('../models/Movie');
const MoviesxGenres = require('../models/MoviesxGenres');
const CharactersxMovies = require('../models/CharactersxMovies');
const Character = require('../models/Character');
const Genre = require('../models/Genre');

module.exports.getMovies = async (req, res, next) => {
  try {
    const result = await Movie.findAll({
      attributes: ['id', 'title', 'release_date', 'image'],
    });
    if (!result) {
      res.status(404).json({ message: 'No movies found' });
    }
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports.getMovie = async (req, res, next) => {
  try {
    const { id } = req.params;

    const movie = await Movie.findOne({
      where: { id }, include: [{ model: Character }, { model: Genre }],
    });

    if (!movie) {
      res.status(404).json({ message: 'no movie found' });
      return;
    }

    res.status(200).json(movie);
  } catch (error) {
    next(error);
  }
};

module.exports.addMovie = async (req, res, next) => {
  try {
    const {
      title,
      release_date,
      qualification,
      image,
      id_characters,
      id_genres,
    } = req.body;

    const movie = await Movie.create({
      title,
      release_date,
      qualification,
      image,
    });

    if (id_characters !== '') {
      const arrayIdCharacters = id_characters.split(',');

      for (let i = 0; i < arrayIdCharacters.length; i += 1) {
        const characterFound = await Character.findOne({
          where: { id: arrayIdCharacters[i] },
        });

        if (!characterFound) {
          res.status(404).json({ message: 'no character found' });
          return;
        }

        await CharactersxMovies.create({
          characterId: parseInt(arrayIdCharacters[i], 10),
          movieId: movie.id,
        });
      }
    }

    if (id_genres !== '') {
      const arrayIdGenres = id_genres.split(',');

      for (let i = 0; i < arrayIdGenres.length; i += 1) {
        const genresFound = await Genre.findOne({ where: { id: arrayIdGenres[i] } });

        if (!genresFound) {
          res.status(404).json({ message: 'no genre found' });
          return;
        }

        await MoviesxGenres.create({
          movieId: movie.id,
          genreId: arrayIdGenres[i],
        });
      }
    }
    res.status(200).json({ message: 'the Movie was added successfully!' });
  } catch (error) {
    next(error);
  }
};

module.exports.updateMovie = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      title,
      release_date,
      qualification,
      image,
    } = req.body;

    const movie = await Movie.findOne({ where: { id } });
    if (!movie) {
      res.status(404).json({ message: 'The requested movie was not found' });
      return;
    }

    await Movie.update({
      title,
      release_date,
      qualification,
      image,
    },
    { where: { id } });

    res.status(200).json({ message: 'the movie was updated successfully!' });
  } catch (error) {
    next(error);
  }
};

module.exports.deleteMovie = async (req, res, next) => {
  try {
    const { id } = req.params;
    const movie = await Movie.findOne({ where: { id } });

    if (!movie) {
      res.status(404).json({ message: 'The requested movie was not found' });
      return;
    }

    Movie.destroy({
      where: {
        id,
      },
    });

    res.status(200).json({ message: 'the movie was delete successfully!' });
  } catch (error) {
    next(error);
  }
};

module.exports.getMovieByName = async (req, res, next) => {
  try {
    const { name } = req.query;
    const movie = await Movie.findOne({
      where: {
        title: name,
      },
    });

    if (!movie) {
      res.status(404).json({ message: 'The requested movie was not found' });
      return;
    }

    res.status(200).json(movie);
  } catch (error) {
    next(error);
  }
};

module.exports.getMovieByGenre = async (req, res, next) => {
  try {
    const { genre } = req.query;
    const movies = await Movie.findAll({
      include: [{
        model: Genre,
        where: {
          id: genre,
        },
      }],
    });

    if (!movies.length) {
      res.status(404).json({ message: 'The requested movie was not found' });
      return;
    }

    res.status(200).json(movies);
  } catch (error) {
    next(error);
  }
};

module.exports.getMovieByOrder = async (req, res, next) => {
  try {
    const { order } = req.query;
    const movies = await Movie.findAll({
      order: [
        ['release_date', `${order}`]],
    });

    if (!movies.length) {
      res.status(404).json({ message: 'The requested movies was not found' });
      return;
    }
    res.status(200).json(movies);
  } catch (error) {
    next(error);
  }
};
