const client = require('./pg.client');

const Upload = require('./upload.mapper');
const Site = require('./site.mapper');
const FeedBack = require('../api/home/models/feedback.mapper');

module.exports = {
  upload: new Upload(client),
  site: new Site(client),
  feedback: new FeedBack(client),

};
