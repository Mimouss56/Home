const http = require('http');
require('dotenv').config();
const { tokenBaby } = require('./config.json');

const app = require('./app');
const bot = require('./bot');

const port = process.env.PORT ?? 3000;

const server = http.createServer(app);

bot.login(tokenBaby);

server.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});