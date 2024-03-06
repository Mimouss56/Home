const { removeCommands } = require('./index');
require('dotenv').config();
const botName = 'mimouss';
const optionsService = require('../../app/api/home/services/option.service');
const { guildID } = require('../../config.json');

async function getBotInfo() {
  const botToken = await optionsService.getBotInfo(botName);
  // on close la connexion
  await optionsService.close();

  return botToken;
}

async function main() {
  const bot = await getBotInfo();
  removeCommands(
    bot.clientID,
    bot.token,
    guildID[botName.toLocaleUpperCase()],
    botName,
  );
  await optionsService.close();
}
async function run() {
  await main();
}

run();