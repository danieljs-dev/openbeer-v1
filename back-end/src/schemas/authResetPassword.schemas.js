const { validateEmailField, validatePasswordField } = require('./utils');
const { isBlank, isNotEqual, isGreaterThan } = require('./helpers');

const error = {
  userNotFound: 'C_ERR_RESET_USER_NOT_FOUND',
  invalidToken: 'C_ERR_INVALID_TOKEN',
  expiredToken: 'C_ERR_EXPIRED_TOKEN',
};

const authReset = (user, token) => {
  const now = new Date();
  switch (true) {
    case isBlank(user): throw new Error(error.userNotFound);
    case isNotEqual(token, user.password_reset_token): throw new Error(error.invalidToken);
    case isGreaterThan(now, user.password_reset_expires): throw new Error(error.expiredToken);
    default: return null;
  };
};

module.exports = ({ user, email, token, password }) => {
  validateEmailField(email);
  validatePasswordField(password);
  authReset(user, token);
};
