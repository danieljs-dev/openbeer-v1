const { StatusCodes } = require('http-status-codes');
const { admin } = require('../../services');
const { salesError } = require('./error');

module.exports = async (_req, res, next) => {
  try {
    const allSales = await admin.getAll();
    return res.status(StatusCodes.OK).json(allSales);
  } catch (err) {
    return next({ ...salesError, err });
  }
};
