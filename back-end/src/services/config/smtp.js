require('dotenv/config');

module.exports = {
  host: 'smtp.gmail.com',
  port: 587,
  user: 'comercial.openbeer@gmail.com',
  pass: process.env.GMAIL_PASSWORD,
};
