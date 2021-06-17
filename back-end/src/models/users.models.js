const connection = require('./connection');

const insertNewUser = async ({ name, email, passwordHash, role }) => {
  const QUERY = 'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)';
  const [{ insertId }] = await connection.query(QUERY, [name, email, passwordHash, role]);
  return insertId;
};

const updateNameByEmail = async (name, id) => {
  const QUERY = 'UPDATE users SET name = ? WHERE id = ?';
  try {
    await connection.query(QUERY, [name, id]);
    return { name };
  } catch (err) {
    throw new Error(err);
  };
};

const insertResetPasswordTokenColumnsOnUserTable = async () => {
  try {
    const QUERY_CMD = 'ALTER TABLE users ';
    const ADD_TABLE1 = 'ADD COLUMN password_reset_token VARCHAR(100) default NULL, ';
    const ADD_TABLE2 = 'ADD COLUMN password_reset_expires DATETIME default NULL AFTER password_reset_token;';
    const QUERY = QUERY_CMD + ADD_TABLE1 + ADD_TABLE2;
    await connection.query(QUERY);
  } catch (err) {
    return { error: err };
  };
};

const updateResetPasswordTokenColumnsById = async (resetPasswordToken, passwordResetExpires, id) => {
  const QUERY = 'UPDATE users SET password_reset_token = ?, password_reset_expires = ? WHERE id = ?;';
  try {
    await connection.query(QUERY, [resetPasswordToken, passwordResetExpires, id]);
  } catch (err) {
    throw new Error(err);
  };
};

const clearResetPasswordColumns = async (id) => {
  const QUERY = 'UPDATE users SET password_reset_token = null, password_reset_expires = null WHERE id = ?;';
  try {
    await connection.query(QUERY, [id]);
  } catch (err) {
    throw new Error(err);
  };
}

const updatePasswordById = async (password, id) => {
  const QUERY = 'UPDATE users SET password = ? WHERE id = ?;'
  try {
    await connection.query(QUERY, [password, id]);
  } catch (err) {
    throw new Error(err);
  };
};

module.exports = {
  insertNewUser,
  updateNameByEmail,
  insertResetPasswordTokenColumnsOnUserTable,
  updateResetPasswordTokenColumnsById,
  clearResetPasswordColumns,
  updatePasswordById,
};
