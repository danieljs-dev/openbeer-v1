const { StatusCodes } = require('http-status-codes');
const { admin } = require('../../services');
const { salesError } = require('./error');

module.exports = async (req, res, next) => {
  try {
    const { body: { delivered }, params: { id: saleId } } = req;
    const status = await admin.updateSaleStatus(saleId, delivered);
    return res.status(StatusCodes.OK).json({ message: 'Success', ...status });
  } catch (err) {
    return next({ ...salesError, err });
  }
};
