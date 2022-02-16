const jwt = require('jsonwebtoken');

const secret = 'mysecretssshhhhhhh';
// const expiration = '2h';

module.exports = {
  signToken: function ({ username, email, _id, isAdmin }) {
    const payload = { username, email, _id, isAdmin };
    return jwt.sign({ data: payload }, secret);
  },
};
