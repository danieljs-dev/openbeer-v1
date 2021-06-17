const express = require('express');

const controllers = require('../controllers/products');
const middlewares = require('../middlewares');

const products = express.Router();

products.get('/', middlewares.authToken, controllers.products);

module.exports = products;
