const client = require('./pg.client');

const List = require('./list.mapper');
const Card = require('./card.mapper');
// const Tag = require('./tag.mapper');

module.exports = {
  list: new List(client),
  card: new Card(client),
  // tag: new Tag(client),
};
