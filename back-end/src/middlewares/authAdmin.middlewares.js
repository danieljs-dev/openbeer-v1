const { verifyToken } = require('../security');

const noToken = 'C_ERR_NO_TOKEN';

const tokenError = {
  statusCode: 401,
  customCode: 'C_ERROR_TOKEN',
  customMessage: 'Athentication error. Please, contact support or try again later.',
};

module.exports = (req, _res, next) => {
  try {
    const { authorization: token } = req.headers;
    if (!token) throw new Error(noToken);
    const { role } = verifyToken(token);
    if (role !== 'administrator') throw new Error(tokenError.customCode);
    return next();
  } catch (err) {
    next({ ...tokenError, err });
  }
};