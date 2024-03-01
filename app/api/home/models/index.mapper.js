const client = require('./pg.client');

const Sanction = require('./sanction.mapper');
const Skill = require('./skill.mapper');
const News = require('./news.mapper');
const Option = require('./option.mapper');
const Portfolio = require('./portfolio.mapper');
const Ent = require('./suiviEnt/propal.mapper');
const Suivi = require('./suiviEnt/index.mapper');
const User = require('./user/index.mapper');
const Cv = require('./cv.mapper');

// const Job = require('./job.mapper');
// const School = require('./school.mapper');

module.exports = {
  // job: new Job(client),
  // school: new Schkool(client),
  sanction: new Sanction(client),
  skill: new Skill(client),
  news: new News(client),
  option: new Option(client),
  portfolio: new Portfolio(client),
  ent: new Ent(client),
  cv: new Cv(client),
  suivi: Suivi,
  user: User,
};
