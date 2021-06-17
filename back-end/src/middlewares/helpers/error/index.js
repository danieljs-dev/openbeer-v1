module.exports = {
  C_ERR_USER_NOT_FOUND: {
    statusCode: 404,
    customCode: 'C_ERR_USER_NOT_FOUND',
    customMessage: 'Login failed. User not found.',
  },
  C_ERR_INVALID_CRED: {
    statusCode: 401,
    customCode: 'C_ERR_INVALID_CRED',
    customMessage: 'Login failed. Invalid credentials.',
  },
  C_ERR_PASS_REQ: {
    statusCode: 400,
    customCode: 'C_ERR_PASS_REQ',
    customMessage: 'Password field is required.',
  },
  C_ERR_PASS_INVALID: {
    statusCode: 400,
    customCode: 'C_ERR_PASS_INVALID',
    customMessage: 'Password must be at least 6 characters.',
  },
  C_ERR_EMAIL_INVALID: {
    statusCode: 400,
    customCode: 'C_ERR_EMAIL_INVALID',
    customMessage: 'Email must be at a valid format. Example: your@email.com',
  },
  C_ERR_EMAIL_REQ: {
    statusCode: 400,
    customCode: 'C_ERR_EMAIL_REQ',
    customMessage: 'Email field is required.',
  },
  C_ERR_NAME_REQ: {
    statusCode: 400,
    customCode: 'C_ERR_NAME_REQ',
    customMessage: 'Name field is required.',
  },
  C_ERR_NAME_INVALID: {
    statusCode: 400,
    customCode: 'C_ERR_NAME_INVALID',
    customMessage: 'Name must be at least 12 characters in a valid format. Example: Gabi Dal Silv',
  },
  ERROR_USER_PROFILE: {
    statusCode: 400,
    customCode: 'C_ERR_UPDATE_PROFILE_UNAVAIBLE',
    customMessage: 'Update profile failed.',
  },
  C_ERR_ISVENDOR_INVALID: {
    statusCode: 400,
    customCode: 'C_ERR_ISVENDOR_INVALID',
    customMessage: 'isValid field must be a boolean.',
  },
  C_ERR_EMAIL_UNAVAIBLE: {
    statusCode: 400,
    customCode: 'C_ERR_EMAIL_UNAVAIBLE',
    customMessage: 'This email is already in use.',
  },
  C_ERR_NO_TOKEN: {
    statusCode: 401,
    customCode: 'C_ERR_NO_TOKEN',
    customMessage: 'Authentication token is missing.',
  },
  C_ERR_ACC_DND: {
    statusCode: 403,
    customCode: 'C_ERR_ACC_DND',
    customMessage: 'Access denied.',
  },
  C_ERR_NOT_FOUND: {
    statusCode: 404,
    customCode: 'C_ERR_NOT_FOUND',
    customMessage: 'Not found.',
  },
  C_ERR_NO_PRODS: {
    statusCode: 400,
    customCode: 'C_ERR_NO_PRODS',
    customMessage: 'There are no products in this sale.',
  },
  C_ERR_INVALID_PRODS: {
    statusCode: 400,
    customCode: 'C_ERR_INVALID_PRODS',
    customMessage: 'Invalid products id or quantity',
  },
  C_ERR_INVALID_DELV: {
    statusCode: 400,
    customCode: 'C_ERR_INVALID_DELV',
    customMessage: 'Invalid delivery adress or number',
  },
  C_ERR_NO_USER_TOKEN: {
    statusCode: 500,
    customCode: 'C_ERR_NO_USER_TOKEN',
    customMessage: 'Unexpected token error',
  },
  C_ERR_PRICE: {
    statusCode: 400,
    customCode: 'C_ERR_PRICE',
    customMessage: 'price inconsistency',
  },
  C_ERR_USER_FORGOT_PASSWORD: {
    statusCode: 400,
    customCode: 'C_ERR_FORGOT_PASSWORD',
    customMessage: 'Error on forgot password. Try again.',
  },
  C_ERR_RESET_USER_NOT_FOUND: {
    statusCode: 404,
    customCode: 'C_ERR_RESET_USER_NOT_FOUND',
    customMessage: 'Reset user password failed. User not found.',
  },
  C_ERR_INVALID_TOKEN: {
    statusCode: 400,
    customCode: 'C_ERR_INVALID_TOKEN',
    customMessage: 'Invalid token.',
  },
  C_ERR_EXPIRED_TOKEN: {
    statusCode: 400,
    customCode: 'C_ERR_EXPIRED_TOKEN',
    customMessage: 'Token expired, generete a new one.',
  },
};
