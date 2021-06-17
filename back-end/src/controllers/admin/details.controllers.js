const { StatusCodes } = require('http-status-codes');
const { admin } = require('../../services');
const { salesError } = require('./error');

const errors = {
  SALE_NOT_FOUND: { code: 404, message: 'Sale not found.' },
};

module.exports = async (req, res, next) => {
  try {
    const { params: { id }, userRole } = req;
    const sale = await admin.getSaleById(id, userRole);
    if (!sale) res.status(StatusCodes.NOT_FOUND).json(errors.SALE_NOT_FOUND);
    return res.status(StatusCodes.OK).json(sale);
  } catch (err) {
    return next({ ...salesError, err });
  }
};
