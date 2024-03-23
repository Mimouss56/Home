const client = require('../../../models/pg.client');

const Sanction = require('./sanction.mapper');
const Skill = require('./skill.mapper');
const News = require('./news.mapper');
const Option = require('./option.mapper');
const Portfolio = require('./portfolio.mapper');
const Ent = require('./suiviEnt/propal.mapper');
const Suivi = require('./suiviEnt/index.mapper');
const User = require('./user/index.mapper');
const CV = require('./CV/index.mapper');

module.exports = {
  sanction: new Sanction(client),
  skill: new Skill(client),
  news: new News(client),
  option: new Option(client),
  portfolio: new Portfolio(client),
  ent: new Ent(client),
  cv: CV,
  suivi: Suivi,
  user: User,
};
