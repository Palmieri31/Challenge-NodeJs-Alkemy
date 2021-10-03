const express = require('express');

const router = express.Router();

const validator = require('../middlewares/validator');
const moviesCtrl = require('../controllers/movies.controller');
const { verifyToken } = require('../middlewares/verifyJwt');

router.get('/search/n', [verifyToken], moviesCtrl.getMovieByName);
router.get('/search/g', [verifyToken], moviesCtrl.getMovieByGenre);
router.get('/search/o', [verifyToken], moviesCtrl.getMovieByOrder);
router.get('/', [verifyToken], moviesCtrl.getMovies);
router.get('/:id', [verifyToken], moviesCtrl.getMovie);
router.post('/', [verifyToken, validator.movieValidationRules(), validator.validate], moviesCtrl.addMovie);
router.put('/:id', [verifyToken, validator.movieValidationRules(), validator.validate], moviesCtrl.updateMovie);
router.delete('/:id', [verifyToken], moviesCtrl.deleteMovie);

module.exports = router;
