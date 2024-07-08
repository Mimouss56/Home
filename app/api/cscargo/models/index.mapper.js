const client = require('./pg.client');
const User = require('./user/user.mapper');
const Don = require('./finance/don.mapper');
const Cout = require('./finance/cout.mapper');

module.exports = {
  user: new User(client),
  don: new Don(client),
  cout: new Cout(client),
};
