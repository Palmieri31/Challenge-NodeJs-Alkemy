const express = require('express');

const router = express.Router();

const validator = require('../middlewares/validator');
const charactersCtrl = require('../controllers/characters.controller');
const { verifyToken } = require('../middlewares/verifyJwt');

router.get('/search/n', [verifyToken], charactersCtrl.getCharacterByName);
router.get('/search/a', [verifyToken], charactersCtrl.getCharacterByAge);
router.get('/search/m', [verifyToken], charactersCtrl.getCharacterByMovie);
router.get('/', [verifyToken], charactersCtrl.getCharacters);
router.get('/:id', [verifyToken], charactersCtrl.getCharacter);
router.post('/', [validator.characterValidationRules(), validator.validate, verifyToken], charactersCtrl.addCharacter);
router.put('/:id', [validator.characterValidationRules(), validator.validate, verifyToken], charactersCtrl.updateCharacter);
router.delete('/:id', [verifyToken], charactersCtrl.deleteCharacter);

module.exports = router;
