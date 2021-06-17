const express = require('express');

const controllers = require('../controllers/admin');
const middlewares = require('../middlewares');

const admin = express.Router();

admin.get('/sales/:id', middlewares.authToken, middlewares.authAdmin, controllers.details);

admin.get('/sales', middlewares.authToken, middlewares.authAdmin, controllers.sales);

admin.put('/sales/:id', middlewares.authToken, middlewares.authAdmin, controllers.editSale);

module.exports = admin;
