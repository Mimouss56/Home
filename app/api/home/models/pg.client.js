const pg = require('pg');
const logger = require('../../../utils/logger');

const { Client } = pg;
const userPg = {
  user: process.env.PG_USER,
  database: process.env.PG_DATABASE,
  host: process.env.PG_HOST,
  password: process.env.PG_PASSWORD,
};

const client = new Client(userPg);

client.connect()
  .then(() => {
    if (process.env.NODE_ENV === 'dev') logger.log('✅ CONNECTÉ À LA DB HOME');
  })
  .catch((error) => {
    logger.log('❌ ERREUR DE CONNEXION À LA DB pour HOME', error);
  });

module.exports = client;
