const pg = require('pg');
const logger = require('../../../utils/logger');

const { Client } = pg;

const client = new Client({
  user: process.env.PG_USER_ESA,
  database: process.env.PG_DATABASE_ESA,
  host: process.env.PG_HOST,
  password: process.env.PG_PASSWORD_ESA,
});

client.connect()
  .then(() => {
    if (process.env.NODE_ENV === 'dev') logger.log('✅ CONNECTÉ À LA DB ESA');
  })
  .catch((error) => {
    logger.log('❌ ERREUR DE CONNEXION À LA DB ESA', error);
  });

module.exports = client;
