const http = require('http');
require('dotenv').config();
const { tokenBaby } = require('./config.json');
const app = require('./app');
const bot = require('./bot');
const optionService = require('./app/services/home/option.service');

const port = process.env.PORT ?? 3000;

const server = http.createServer(app);

(async () => {
  try {
      const tokenDiscordBot = await optionService.getOne("tokenDiscordBot");
      if(!tokenDiscordBot.active){
        return (console.log("Pas de bot discord actif"));
      }
      
      bot.login(tokenDiscordBot.value);      
  } catch (error) {
      console.error("Failed to retrieve the Discord bot token:", error);
  }
})();

// bot.login(tokenDiscordBot.value);

server.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});