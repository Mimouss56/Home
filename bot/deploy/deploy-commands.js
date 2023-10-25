const { deployCommands } = require('./index');
const { clientIdBBC, tokenBBC } = require('../../config.json');

// Déployer les commandes sur le bot BBC


deployCommands(clientIdBBC, tokenBBC, "bbc");

