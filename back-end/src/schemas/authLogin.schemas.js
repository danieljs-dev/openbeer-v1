const { validatePasswordField, validateEmailField } = require('./utils');
const { isBlank, isNotEqual } = require('./helpers');

const error = {
  invalidCredentials: 'C_ERR_INVALID_CRED',
  userNotFound: 'C_ERR_USER_NOT_FOUND',
};

const authUser = (email, user, matchPassword) => {
  switch (true) {
    case isBlank(user): throw new Error(error.userNotFound);
    case isNotEqual(email, user.email): throw new Error(error.invalidCredentials);
    case isBlank(matchPassword): throw new Error(error.invalidCredentials);
    default: return null;
  };
};

module.exports = ({ email, password, user, matchPassword }) => {
  validateEmailField(email);
  validatePasswordField(password);
  authUser(email, user, matchPassword);
};
