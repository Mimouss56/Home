const client = require('./pg.client');

const Job = require('./home/job.mapper');
const Role = require('./home/role.mapper');
const User = require('./user.mapper');
const School = require('./home/school.mapper');
const Sanction = require('./home/sanction.mapper');
const Skill = require('./home/skill.mapper');
const News = require('./home/news.mapper');
const Option = require('./home/option.mapper');
const UserOption = require('./userOption.mapper');

module.exports = {
  job: new Job(client),
  role: new Role(client),
  user: new User(client),
  userOption: new UserOption(client),
  school: new School(client),
  sanction: new Sanction(client),
  skill: new Skill(client),
  news: new News(client),
  option: new Option(client),
};
