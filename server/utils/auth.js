const jwt = require('jsonwebtoken');

const secret = 'mysecretssshhhhhhh';
// const expiration = '2h';

module.exports = {
  signToken: function ({ username, email, _id, isAdmin, isSendNotifications }) {
    const payload = { username, email, _id, isAdmin, isSendNotifications };
    return jwt.sign({ data: payload }, secret);
  },
};
