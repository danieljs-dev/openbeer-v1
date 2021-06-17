const { users } = require('../../services');
const { resetError } = require('./error');

module.exports = async (req, res, next) => {
  try {
    const { email, token, password } = req.body;

    await users.reset(email, token, password);

    res.json({ message: 'Password updated success' });
  } catch (err) {
    return next({ ...resetError, err });
  };
};
