require('dotenv/config');

module.exports = {
  host: 'smtp.gmail.com',
  port: 587,
  user: process.env.GMAIL_ACCOUNT,
  pass: process.env.GMAIL_PASSWORD,
};
