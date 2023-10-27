/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
const optionService = require('../api/home/services/option.service');

const active = async () => {
  const allBot = await optionService.get({ where: { name: 'bot' } });
  allBot.forEach(async (bot) => {
    if (bot.active) {
      const botName = bot.value;
      const botToken = await optionService.getOne(botName);
      const botModule = require(`../../bot/bots/${botName}`);
      botModule.login(botToken.value);
    }
  });
};

module.exports = {
  active,
};
