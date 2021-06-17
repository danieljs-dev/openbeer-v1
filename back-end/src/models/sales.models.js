const connection = require('./connection');

const handleItermediateTable = async (saleId, products) => {
  products.forEach(async ({ productId, quantity }) => {
    const QUERY = 'INSERT INTO sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)';
    await connection.query(QUERY, [saleId, productId, quantity]);
  });
};

const insertNewSale = async ({ delivery, salePrice, sale }, userId) => {
  const { address, number } = delivery;
  const QUERY_CMD = 'INSERT INTO sales ';
  const QUERY_COL = '(user_id, total_price, delivery_address, delivery_number, sale_date, status) ';
  const QUERY_VALUES = 'VALUES (?, ?, ?, ?, now(), "Pendente")';
  const QUERY = QUERY_CMD + QUERY_COL + QUERY_VALUES;
  const [{ insertId }] = await connection.query(QUERY, [
    userId,
    salePrice,
    address,
    number,
  ]);

  await handleItermediateTable(insertId, sale);
  return insertId;
};

module.exports = {
  insertNewSale,
};
