const { users } = require('../../services');
const { forgotError } = require('./error');
const { sendEmail } = require('../../services');

module.exports = async (req, res, next) => {
  try {
    const { email } = req.body;
    const token = await users.forgot(email);

    sendEmail.forgotPassword(email, token);
    res.json({ message: 'Check your email.' });
  } catch (err) {
    return next({ ...forgotError, err });
  };
};
