/* eslint-disable no-tabs */
const CoreDatamapper = require('../../../../models/core.mapper');
/**
 * Table finance_don
 * @property {number} id
 * @property {number} user_id related to user.id
 * @property {Date} date
 * @property {number} nb_part
 * @property {number} solde
 */

module.exports = class Don extends CoreDatamapper {
  tableName = 'finance_don';

  async sumPart() {
    const preparedQuery = {
      text: `
				SELECT SUM(nb_part) as sumPart
				FROM "${this.tableName}"
				`,
    };
    const result = await this.client.query(preparedQuery);
    if (!result.rows[0]) {
      return 0;
    }
    return result.rows[0].sumPart;
  }

  async soldeCompte() {
    const preparedQuery = {
      text: `
				SELECT SUM(solde) as soldeCompte
				FROM "${this.tableName}"
				`,
    };
    const result = await this.client.query(preparedQuery);
    if (!result.rows[0]) {
      return 0;
    }
    return result.rows[0].soldeCompte;
  }
};
