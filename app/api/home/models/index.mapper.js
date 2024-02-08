const client = require('./pg.client');

const Job = require('./job.mapper');
const Role = require('./role.mapper');
const User = require('./user.mapper');
const School = require('./school.mapper');
const Sanction = require('./sanction.mapper');
const Skill = require('./skill.mapper');
const News = require('./news.mapper');
const Option = require('./option.mapper');
const UserOption = require('./userOption.mapper');
const Portfolio = require('./portfolio.mapper');
const Ent = require('./suiviEnt/propal.mapper');
const Interaction = require('./suiviEnt/interaction.mapper');
const Contact = require('./suiviEnt/contact.mapper');
const Status = require('./suiviEnt/status.mapper');

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
  portfolio: new Portfolio(client),
  ent: new Ent(client),
  interaction: new Interaction(client),
  contact: new Contact(client),
  status: new Status(client),
};
