const { StatusCodes } = require('http-status-codes');
const { products } = require('../../services');
const { productsError } = require('./error');

module.exports = async (_req, res, next) => {
  try {
    const allProducts = await products.getAll();
    return res.status(StatusCodes.OK).json(allProducts);
  } catch (err) {
    return next({ ...productsError, err });
  }
};
