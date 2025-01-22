const pg = require('pg');
const logger = require('../../../utils/logger');

const { Client } = pg;

const client = new Client({
  host: process.env.PG_HOST,
  user: process.env.PG_USER_BBC,
  database: process.env.PG_DATABASE_BBC,
  password: process.env.PG_PASSWORD_BBC,
});

client.connect()
  .then(() => {
    if (process.env.NODE_ENV === 'development') logger.log('✅ CONNECTÉ À LA DB BBC');
  })
  .catch((error) => {
    logger.log('❌ ERREUR DE CONNEXION À LA DB BBC', error);
  });

module.exports = client;
