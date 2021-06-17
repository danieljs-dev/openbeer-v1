const buildDevLoggers = require('./dev.logger');
const buildProdLoggers = require('./prod.logger');

let loggers = null;

if (process.env.NODE_ENV === 'development') {
  loggers = buildDevLoggers();
} else {
  loggers = buildProdLoggers();
}

module.exports = loggers;
