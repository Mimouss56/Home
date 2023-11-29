const { removeCommands } = require('./index');
const { clientID, token, guildID } = require('../../config.json');
const botName = "bbc";

removeCommands(
  clientID[botName.toLocaleUpperCase()],
  token[botName.toLocaleUpperCase()],
  guildID[botName.toLocaleUpperCase()],
  botName
);