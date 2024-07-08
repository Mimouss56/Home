const CoreDatamapper = require('../../../../models/core.mapper');

/**
 * Table finance_cout
 * @property {number} id
 * @property {string} nom
 * @property {string} description
 * @property {number} montant
 */

module.exports = class Cout extends CoreDatamapper {
  tableName = 'finance_cout';

  async sumCostBot() {
    const preparedQuery = {
      text: `
        SELECT SUM(montant) as sumCostBot
        FROM "${this.tableName}"
        `,
    };
    const result = await this.client.query(preparedQuery);
    if (!result.rows[0]) {
      return null;
    }
    return result.rows[0].sumCostBot;
  }
};
