/* eslint-disable no-console */
const express = require('express');
const dotenv = require('dotenv');
const authsRoutes = require('./routes/auths.routes');
const charactersRoutes = require('./routes/characters.routes');
const moviesRoutes = require('./routes/movies.routes');
const { handleErrors } = require('./middlewares/handleErrors');

const app = express();

const db = require('./database/database');

dotenv.config({ path: 'variables.env' });

db.authenticate()
  .then(() => console.log('Connection has been established successfully.'))
  .catch((error) => console.log(error));

app.use(express.json());

app.use('/auth', authsRoutes);
app.use('/characters', charactersRoutes);
app.use('/movies', moviesRoutes);

app.use(handleErrors);

module.exports = app;
