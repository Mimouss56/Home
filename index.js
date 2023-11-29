const http = require('http');
require('dotenv').config();

const bots = require('./app/middlewares/bots.middleware');
const app = require('./app');
const port = process.env.PORT ?? 3000;
const server = http.createServer(app);

server.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
  bots.active();

});

