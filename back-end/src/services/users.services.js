const bcrypt = require('bcrypt');
const crypto = require('crypto');
const { users, utils } = require('../models');
const { generateToken } = require('../security');

const {
  authRegisterUser,
  authForgotPassword,
  authResetPassword,
  utils: { validateUserName }
} = require('../schemas');

const create = async (body) => {
  const data = body;
  const { name, email } = data;

  const [isEmailAvailable] = await utils.getByFilter({
    table: 'users',
    filter: 'email',
    value: email,
  });

  authRegisterUser(data, isEmailAvailable);

  data.role = (data.isVendor) ? 'administrator' : 'client';

  const numOfGens = 5;
  const salt = await bcrypt.genSalt(numOfGens);
  const passwordHash = await bcrypt.hash(data.password, salt);

  const dataNewUser = {
    name,
    email,
    passwordHash,
    role: data.role,
  };

  const newUserId = await users.insertNewUser(dataNewUser);

  const token = generateToken(newUserId, data.role);
  return { name, email, token, role: data.role };
};

const updateName = async (name, id) => {
  validateUserName(name);
  return users.updateNameByEmail(name, id);
};

const forgot = async (email) => {
  const [user] = await utils.getByFilter({
    table: 'users',
    filter: 'email',
    value: email,
  });

  authForgotPassword(email, user);

  const token = crypto.randomBytes(20).toString('hex');
  const now = new Date();
  now.setHours(now.getHours() + 1);

  await users.insertResetPasswordTokenColumnsOnUserTable();
  await users.updateResetPasswordTokenColumnsById(token, now, user.id);

  return token;
};

const reset = async (email, token, password) => {
  const [user] = await utils.getByFilter({
    table: 'users',
    filter: 'email',
    value: email,
  });

  const dataValidateFields = {
    user,
    email,
    token,
    password,
  };

  authResetPassword(dataValidateFields);

  const numOfGens = 5;
  const salt = await bcrypt.genSalt(numOfGens);
  const passwordHash = await bcrypt.hash(password, salt);

  await users.updatePasswordById(passwordHash, user.id);
  await users.clearResetPasswordColumns(user.id);
};

module.exports = {
  create,
  updateName,
  forgot,
  reset,
};
