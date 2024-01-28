const { deployCommands } = require('./index');
const { clientID, token } = require('../../config.json');
const botName = "mimouss";
// Déployer les commandes sur le bot BBC


deployCommands(clientID[botName.toLocaleUpperCase()], token[botName.toLocaleUpperCase()], botName);

