const { utils, admin } = require('../models');
const { authStatusUpdate, authDetailsSale } = require('../schemas');

const getAll = async () => utils.getAll('sales');

const getSaleById = async (saleId, userRole) => {
  const [result] = await admin.querySaleById(saleId);
  authDetailsSale(result, 1, userRole);
  const addSaleDetails = await utils.getByFilter({
    table: 'sales_products',
    filter: 'sale_id',
    value: saleId,
  });
  result.sale = addSaleDetails;
  return result;
};

const updateSaleStatus = async (saleId, boolean) => {
  authStatusUpdate(saleId, boolean);
  const status = (boolean) ? 'Entregue' : 'Pendente';
  return admin.updateSaleStatus(status, saleId);
};

module.exports = {
  getAll,
  getSaleById,
  updateSaleStatus,
};
