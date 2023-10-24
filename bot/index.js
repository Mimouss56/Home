const bbcBot = require('./bots/bbc');
const mimoussBot = require('./bots/mimouss');
const { tokenBBC, tokenMimouss } = require('../config.json');

const loginBot = async (bot, token) => {
  const client = await bot.login(token);
  return client;
};

const bbc = async () => {
  return loginBot(bbcBot, tokenBBC);
};

const mimouss = async () => {
  return loginBot(mimoussBot, tokenMimouss);
};

module.exports = {
  bbc,
  mimouss,
};