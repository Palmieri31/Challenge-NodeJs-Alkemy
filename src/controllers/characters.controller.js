const Character = require('../models/Character');
const Movie = require('../models/Movie');

module.exports.getCharacters = async (req, res, next) => {
  try {
    const result = await Character.findAll({
      attributes: ['name', 'image'],
    });
    if (!result) {
      res.status(404).json({ message: 'No characters found' });
    }

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports.getCharacter = async (req, res, next) => {
  try {
    const { id } = req.params;
    const character = await Character.findOne({
      where: { id }, include: Movie,
    });

    if (!character) {
      res.status(404).json({ message: 'no character found' });
      return;
    }

    res.status(200).json(character);
  } catch (error) {
    next(error);
  }
};

module.exports.addCharacter = async (req, res, next) => {
  try {
    const {
      name,
      age,
      weight,
      history,
      image,
    } = req.body;

    await Character.create({
      name,
      age,
      weight,
      history,
      image,
    });
    res.status(200).json({ message: 'the Character was added successfully!' });
  } catch (error) {
    next(error);
  }
};

module.exports.updateCharacter = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      name,
      age,
      weight,
      history,
      image,
    } = req.body;

    const character = await Character.findOne({ where: { id } });
    if (!character) {
      res.status(404).json({ message: 'The requested character was not found' });
      return;
    }

    await Character.update({
      name,
      age,
      weight,
      history,
      image,
    },
    { where: { id } });

    res.status(200).json({ message: 'the character was added successfully!' });
  } catch (error) {
    next(error);
  }
};

module.exports.deleteCharacter = async (req, res, next) => {
  try {
    const { id } = req.params;
    const character = await Character.findOne({ where: { id } });

    if (!character) {
      res.status(404).json({ message: 'The requested character was not found' });
      return;
    }

    Character.destroy({
      where: {
        id,
      },
    });
    res.status(200).json({ message: 'the character was delete successfully!' });
  } catch (error) {
    next(error);
  }
};

module.exports.getCharacterByName = async (req, res, next) => {
  try {
    const { name } = req.query;
    const character = await Character.findOne({
      where: {
        name,
      },
    });

    if (!character) {
      res.status(404).json({ message: 'The requested character was not found' });
      return;
    }
    res.status(200).json(character);
  } catch (error) {
    next(error);
  }
};

module.exports.getCharacterByAge = async (req, res, next) => {
  try {
    const { age } = req.query;
    const characters = await Character.findAll({
      where: {
        age,
      },
    });

    if (!characters.length) {
      res.status(404).json({ message: 'The requested characters was not found' });
      return;
    }

    res.status(200).json(characters);
  } catch (error) {
    next(error);
  }
};

module.exports.getCharacterByMovie = async (req, res, next) => {
  try {
    const { movie } = req.query;
    const characters = await Character.findAll({
      include: [{
        model: Movie,
        where: {
          id: movie,
        },
      }],
    });

    if (!characters.length) {
      res.status(404).json({ message: 'The requested character was not found' });
      return;
    }
    res.status(200).json(characters);
  } catch (error) {
    next(error);
  }
};
