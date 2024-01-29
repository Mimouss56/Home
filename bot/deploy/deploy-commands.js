const { deployCommands } = require('./index');
const { clientID, token } = require('../../config.json');
const botName = "mimouss";
const optionsService = require('../../app/api/home/services/option.service');

// on récupere le token stocker dans la bdd
const tokenBot = optionsService.getOne({ name: botName });
tokenBot.then((token) => {
    console.log(token);
});

// Déployer les commandes sur le bot BBC
deployCommands(clientID[botName.toLocaleUpperCase()], token[botName.toLocaleUpperCase()], botName);

