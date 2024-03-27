const client = require('../../../../models/pg.client');

const Infos = require('./info.mapper');
const Details = require('./cv.mapper');

module.exports = {
  details: new Details(client),
  infos: new Infos(client),
};
