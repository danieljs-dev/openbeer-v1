const connection = require('./connection');

const querySaleById = async (id) => {
  try {
    const QUERY_CMD = 'SELECT *, ';
    const SUB_QUERY = '(SELECT name FROM users AS a WHERE a.id = s.user_id) AS user_name ';
    const QUERY_TABLE = 'FROM sales AS s ';
    const QUERY_FILTER = 'WHERE id = ?;';
    const QUERY = QUERY_CMD + SUB_QUERY + QUERY_TABLE + QUERY_FILTER;
    const [results] = await connection.query(QUERY, [id]);
    return results;
  } catch (err) {
    return { error: err };
  }
};

const updateSaleStatus = async (status, saleId) => {
  const QUERY = 'UPDATE sales SET status = ? WHERE id = ?';
  const [result] = await connection.query(QUERY, [status, saleId]);
  if (result.changedRows > 0) {
     return { status: 'OK',
    message: 'Status equals request. Not changed.' };
  }
  if (result.affectedRows < 1) {
      return { status: 'ERROR',
     message: 'Sale not found.' };
  }
};

module.exports = {
  querySaleById,
  updateSaleStatus,
};
