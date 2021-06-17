const { utils } = require('../models');

const getAll = async () => utils.getAll('products');

module.exports = {
  getAll,
};
