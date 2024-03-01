const client = require('./pg.client');

const Upload = require('./upload.mapper');
const Site = require('./site.mapper');
const FeedBack = require('./feedback.mapper');
const Visitor = require('./stats/visitor.stats.mapper');
const Page = require('./stats/page.stats.mapper');
const Stats = require('./stats/stats.mapper');

module.exports = {
  upload: new Upload(client),
  site: new Site(client),
  feedback: new FeedBack(client),
  visitor: new Visitor(client),
  page: new Page(client),
  stats: new Stats(client),

};
