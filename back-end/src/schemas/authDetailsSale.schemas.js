const { isBlank, isNotEqual } = require('./helpers');

module.exports = (sale, userId, userRole) => {
  switch (true) {
    case isBlank(sale): throw new Error('C_ERR_NOT_FOUND');
    case (isNotEqual(sale.user_id, userId) && userRole !== 'administrator'):
      throw new Error('C_ERR_ACC_DND');
    default: break;
  }
};
