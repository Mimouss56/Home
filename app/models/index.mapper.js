const client = require('./pg.client');

const Job = require('./job.mapper');
const Role = require('./role.mapper');
const User = require('./user.mapper');
const School = require('./school.mapper');
const Sanction = require('./sanction.mapper');


module.exports = {
  job: new Job(client),
  role: new Role(client),
  user: new User(client),
  school: new School(client),
  sanction: new Sanction(client),
};
