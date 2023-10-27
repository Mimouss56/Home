const client = require('./pg.client');

const Child = require('./child.mapper');
const Parent = require('./parent.mapper');
const Cantine = require('./cantine.mapper');

module.exports = {
  eSAChild: new Child(client),
  eSAParent: new Parent(client),
  eSACantine: new Cantine(client),
};
