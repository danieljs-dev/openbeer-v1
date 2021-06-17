const { StatusCodes } = require('http-status-codes');
const { users } = require('../../services');
const { registerError } = require('./error');
const { sendEmail } = require('../../services');

module.exports = async (req, res, next) => {
  try {
    const { body } = req;
    const user = await users.create(body);
    res.status(StatusCodes.CREATED).json(user);
    sendEmail.welcomeEmail(body.email, body.name);
  } catch (err) {
    return next({ ...registerError, err });
  }
};
