const { removeCommands } = require('./index');
const { clientIdBBC, tokenBBC, guildIdBBC } = require('../../config.json');

removeCommands(clientIdBBC, tokenBBC, guildIdBBC);