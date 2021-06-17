const { isNotBool, isBlank } = require('./helpers');

const error = {
  invalidStatus: 'C_ERR_INVALID_STATUS',
  saleInvalid: 'C_ERR_SALE_NOT_VALID',
};

const authStatusUpdate = (saleId, status) => {
  switch (true) {
    case isNotBool(status): throw new Error(error.invalidStatus);
    case isBlank(saleId): throw new Error(error.saleInvalid);
    default: return null;
  }
};

module.exports = authStatusUpdate;
