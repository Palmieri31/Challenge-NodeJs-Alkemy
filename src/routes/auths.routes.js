const express = require('express');

const router = express.Router();

const validator = require('../middlewares/validator');
const verifyRegister = require('../middlewares/verifyRegister');
const authsCtrl = require('../controllers/auths.controller');

router.post('/register', [validator.authValidationRules(), validator.validate, verifyRegister.ckeckDuplicateEmail], authsCtrl.register);

router.post('/login', [validator.authValidationRules(), validator.validate], authsCtrl.login);

module.exports = router;
