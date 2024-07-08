const pg = require('pg');
const logger = require('../../../utils/logger');

const { Client } = pg;

const client = new Client({
  host: process.env.PG_HOST_CSCARGO,
  user: process.env.PG_USER_CSCARGO,
  database: process.env.PG_BASE_CSCARGO,
  password: process.env.PG_PASSWORD_CSCARGO,
});

client.connect()
  .then(() => {
    if (process.env.NODE_ENV === 'dev') logger.log('✅ CONNECTÉ À LA DB');
  })
  .catch((error) => {
    logger.log('❌ ERREUR DE CONNEXION À LA DB', error);
  });

module.exports = client;
