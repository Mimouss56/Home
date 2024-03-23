const client = require('../../../../models/pg.client');

const Role = require('./role.mapper');
const Base = require('./user.mapper');
const Option = require('./userOption.mapper');
const Infos = require('./info.mapper');

module.exports = {
  role: new Role(client),
  base: new Base(client),
  option: new Option(client),
  infos: new Infos(client),
};
