const client = require('./pg.client');

const User = require('./user.mapper');
const Donator = require('./donator.mapper');
const Don = require('./don.mapper');
// const Job = require('./job.mapper');
// const Role = require('./role.mapper');
// const School = require('./school.mapper');
// const Sanction = require('./sanction.mapper');
// const Skill = require('./skill.mapper');
// const News = require('./news.mapper');
// const Option = require('./option.mapper');
// const UserOption = require('./userOption.mapper');

module.exports = {
  user: new User(client),
  donator: new Donator(client),
  don: new Don(client),
  // job: new Job(client),
  // role: new Role(client),
  // userOption: new UserOption(client),
  // school: new School(client),
  // sanction: new Sanction(client),
  // skill: new Skill(client),
  // news: new News(client),
  // option: new Option(client),
};
