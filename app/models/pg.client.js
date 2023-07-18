const pg = require('pg');
const logger = require('../utils/logger');

const { Client } = pg;

const client = new Client({
  user: process.env.PG_USER,
  database: process.env.PG_DATABASE,
  host: process.env.PG_HOST,
  password: process.env.PG_PASSWORD,
});

client.connect()
  .then(() => {
    logger.log('✅ CONNECTÉ À LA DB');
  })
  .catch((error) => {
    logger.log('❌ ERREUR DE CONNEXION À LA DB', error);
  });

module.exports = client;
