const pg = require('pg');
const logger = require('../../../utils/logger');

const { Client } = pg;

const client = new Client({
  user: process.env.PG_USER_KANBAN,
  database: process.env.PG_DATABASE_KANBAN,
  host: process.env.PG_HOST_KANBAN,
  password: process.env.PG_PASSWORD_KANBAN,
});

try {
  client.connect();
  logger.log('✅ CONNECTE A LA DB KANBAN');
} catch (error) {
  logger.log('❌ ERREUR DE CONNECTION A LA DB', error);
}
module.exports = client;
