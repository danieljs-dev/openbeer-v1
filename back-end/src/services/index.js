const session = require('./session.services');
const users = require('./users.services');
const products = require('./products.services');
const sales = require('./sales.services');
const admin = require('./admin.services');
const mailer = require('./mailer.services');
const sendEmail = require('./sendEmail.services');

module.exports = {
  session,
  users,
  products,
  sales,
  admin,
  mailer,
  sendEmail,
};
