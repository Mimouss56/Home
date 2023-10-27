const client = require('./pg.client');

const User = require('./user.mapper');
const Donator = require('./donator.mapper');
const Don = require('./don.mapper');
const Sanction = require('./sanction.mapper');

module.exports = {
  user: new User(client),
  donator: new Donator(client),
  don: new Don(client),
  sanction: new Sanction(client),

};
