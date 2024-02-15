const CoreDatamapper = require('../core.mapper');

module.exports = class Stats extends CoreDatamapper {
  tableName = 'stat_view';

  async createStat(input) {
    const fields = [];
    const placeholders = [];
    const values = [];
    let indexPlaceholder = 1;

    Object.entries(input).forEach(([prop, value]) => {
      fields.push(`"${prop}"`);
      placeholders.push(`$${indexPlaceholder}`);
      indexPlaceholder += 1;
      values.push(value);
    });

    const preparedQuery = {
      text: `
            INSERT INTO "${this.tableName}"
            (${fields})
            VALUES (${placeholders})
            RETURNING *
          `,
      values,
    };
    const result = await this.client.query(preparedQuery);
    const row = result.rows[0];

    return row;
  }
};
