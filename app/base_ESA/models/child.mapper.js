const CoreDatamapper = require('../../models/core.mapper');

module.exports = class Child extends CoreDatamapper {
  tableName = 'child';

  async getParents(id) {
    const query = {
      text: `
      SELECT * FROM parent 
      WHERE id 
      IN (
        SELECT id_parent FROM parent_has_child WHERE id_enfant = $1
        )
      `,
      values: [id],
    };
    const { rows } = await this.client.query(query);
    return rows;
  }
};
