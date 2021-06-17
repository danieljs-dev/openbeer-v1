const { StatusCodes } = require('http-status-codes');
const { sales } = require('../../services');
const { salesError } = require('./error');

module.exports = async (req, res, next) => {
  try {
    const { userId } = req;
    const mySales = await sales.getById(userId);
    return res.status(StatusCodes.OK).json(mySales);
  } catch (err) {
    return next({ ...salesError, err });
  }
};
