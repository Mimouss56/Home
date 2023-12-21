const pg = require('pg');
const logger = require('../../../utils/logger');

const { Client } = pg;

const client = new Client({
  user: process.env.PG_USER_OSIDE,
  database: process.env.PG_DATABASE_OSIDE,
  host: process.env.PG_HOST,
  password: process.env.PG_PASSWORD_OSIDE,
});

try {
  client.connect();
  if (process.env.NODE_ENV === 'dev') logger.log('✅ CONNECTÉ À LA DB OSIDE');
} catch (error) {
  logger.log('❌ ERREUR DE CONNECTION A LA DB', error);
}
module.exports = client;
