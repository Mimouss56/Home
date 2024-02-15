const client = require('./pg.client');

const Job = require('./job.mapper');
const Role = require('./role.mapper');
const User = require('./user.mapper');
const School = require('./school.mapper');
const Upload = require('./upload.mapper');
const Site = require('./site.mapper');
const FeedBack = require('./feedback.mapper');
const Visitor = require('./stats/visitor.stats.mapper');
const Page = require('./stats/page.stats.mapper');
const Stats = require('./stats/stats.mapper');

module.exports = {
  job: new Job(client),
  role: new Role(client),
  user: new User(client),
  school: new School(client),
  upload: new Upload(client),
  site: new Site(client),
  feedback: new FeedBack(client),
  visitor: new Visitor(client),
  page: new Page(client),
  stats: new Stats(client),
};
