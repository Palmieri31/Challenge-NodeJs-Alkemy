/* eslint-disable no-unused-vars */
module.exports.handleErrors = (err, req, res, next) => {
  res.status(500).send({ message: 'An internal server error ocurred' });
};
