const { body, validationResult } = require('express-validator');

module.exports.authValidationRules = () => [
  body('email', 'Your email is empty').not().isEmpty(),
  body('email', 'Your email is not valid').isEmail().normalizeEmail(),
  body('password', 'Your password is empty').not().isEmpty(),
  body('password', 'Your password must be at least 6 characters').isLength({ min: 6 }),
];

module.exports.characterValidationRules = () => [
  body('name', 'Your name is empty').not().isEmpty(),
  body('age', 'Your age is empty').not().isEmpty(),
  body('age', 'Your age is not a number').isNumeric(),
  body('weight', 'Your weight is empty').not().isEmpty(),
  body('weight', 'Your weight is not a number').isNumeric(),
  body('history', 'Your history is empty').not().isEmpty(),
  body('image', 'Your image is empty').not().isEmpty(),
];

module.exports.movieValidationRules = () => [
  body('title', 'Your title is empty').not().isEmpty(),
  body('release_date', 'release_date ').isDate(),
  body('qualification', 'Your qualification is empty').not().isEmpty(),
  body('qualification', 'Your qualification is not a number').isNumeric(),
  body('image', 'Your image is empty').not().isEmpty(),
];

module.exports.validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  return res.status(422).json({ error: errors.array() });
};
