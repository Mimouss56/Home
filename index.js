const http = require('http');
require('dotenv').config();
const debugServer = require('debug')('server');

const bots = require('./app/middlewares/bots.middleware');
const app = require('./app');
const port = process.env.PORT ?? 3000;
const server = http.createServer(app);

server.on('error', (error) => {
  debugServer(`Error: ${error.message}`);
});

server.listen(port, () => {
  process.env.NODE_ENV === 'development' && debugServer(`Listening on http://localhost:${port}`);
  bots.active();

});

