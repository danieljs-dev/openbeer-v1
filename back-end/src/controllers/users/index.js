const register = require('./register.controllers');
const profile = require('./profile.controllers');
const forgot = require('./forgotPassword.controller');
const reset = require('./resetPassword.controller');

module.exports = {
  register,
  profile,
  forgot,
  reset,
};
