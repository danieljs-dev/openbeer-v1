const adminRouter = require('./admin.routes');
const notFound = require('./notFound.routes');
const productsRouter = require('./products.routes');
const salesRouter = require('./sales.routes');
const sessionRouter = require('./session.routes');
const usersRouter = require('./users.routes');

module.exports = {
  adminRouter,
  notFound,
  productsRouter,
  salesRouter,
  sessionRouter,
  usersRouter,
};
