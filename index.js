const http = require('http');
require('dotenv').config();
const { tokenBaby, tokenBBC } = require('./config.json');
const app = require('./app');
const { bbc, mimouss } = require('./bot');

bbc(tokenBBC);

const port = process.env.PORT ?? 3000;
const server = http.createServer(app);

server.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});



// const optionService = require('./app/base_home/services/option.service');

// (async () => {
//   try {
//     const tokenDiscordBot = await optionService.getOne("tokenDiscordBot");
//     if (tokenDiscordBot?.active) {
//       console.log("Bot discord actif");
//       bot.login(tokenDiscordBot.value);;
//     }
//   } catch (error) {
//     console.log("Pas de bot discord actif")
//     console.error("Failed to retrieve the Discord bot token:", error);
//   }
// })();

// bot.login(tokenDiscordBot.value);