const { StatusCodes } = require('http-status-codes');
const { sales } = require('../../services');
const { createError } = require('./error');

module.exports = async (req, res, next) => {
  try {
    const { body, userId } = req;
    await sales.create(body, userId);
    return res.status(StatusCodes.OK).json({ message: 'Sale successfully created' });
  } catch (err) {
    return next({ ...createError, err });
  }
};
