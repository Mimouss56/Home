const client = require('../pg.client');

const Child = require('./child.mapper');
const Parent = require('./parent.mapper');

module.exports = {
  eSAChild: new Child(client),
  eSAParent: new Parent(client),
};
