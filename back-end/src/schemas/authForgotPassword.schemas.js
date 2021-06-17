const { validateEmailField } = require('./utils');
const { isBlank, isNotEqual } = require('./helpers');

const error = {
  invalidCredentials: 'C_ERR_INVALID_CRED',
  userNotFound: 'C_ERR_USER_NOT_FOUND',
};

const authForgot = (email, user) => {
  switch (true) {
    case isBlank(user): throw new Error(error.userNotFound);
    case isNotEqual(email, user.email): throw new Error(error.invalidCredentials);
    default: return null;
  };
};

module.exports = (email, user) => {
  validateEmailField(email);
  authForgot(email, user);
};
