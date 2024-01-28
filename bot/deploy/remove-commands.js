const { removeCommands } = require('./index');
const { clientID, token, guildID } = require('../../config.json');
const botName = "Mimouss";
console.log(
  'clientId: ', clientID[botName.toLocaleUpperCase()],
  'token: ', token[botName.toLocaleUpperCase()],
  'guildId:', guildID[botName.toLocaleUpperCase()],
  'botname:', botName
);
removeCommands(
  clientID[botName.toLocaleUpperCase()],
  token[botName.toLocaleUpperCase()],
  guildID[botName.toLocaleUpperCase()],
  botName
);