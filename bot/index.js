const bbcBot = require('./bots/bbc');
const mimoussBot = require('./bots/mimouss');

const loginBot = async (bot, token) => {
  const client = await bot.login(token);
  return client;
};

const bbc = async () => {
  return loginBot(bbcBot, process.env.TOKEN_BBC);
};

const mimouss = async () => {
  return loginBot(mimoussBot, process.env.TOKEN_MIMOUSS);
};

module.exports = {
  bbc,
  mimouss,
};