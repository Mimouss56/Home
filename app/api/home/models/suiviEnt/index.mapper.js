const client = require('../pg.client');

const Interaction = require('./interaction.mapper');
const Contact = require('./contact.mapper');
const Status = require('./status.mapper');

module.exports = {
  interaction: new Interaction(client),
  contact: new Contact(client),
  status: new Status(client),
};
