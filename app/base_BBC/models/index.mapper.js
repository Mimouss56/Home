const client = require('./pg.client');

const User = require('./user.mapper');
const Donator = require('./donator.mapper');
const Don = require('./don.mapper');

module.exports = {
  user: new User(client),
  donator: new Donator(client),
  don: new Don(client),

};
