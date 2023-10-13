const CoreDatamapper = require('../core.mapper');

module.exports = class Parent extends CoreDatamapper {
  tableName = 'esa_parent';

  relationTable = 'esa_parent_has_child';

  async addChild(idParent, idChild) {
    const query = {
      text: `
      INSERT INTO ${this.relationTable} (id_parent, id_enfant) VALUES ($1, $2)
      `,
      values: [idParent, idChild],
    };
    await this.client.query(query);
  }

  async getChild(idParent) {
    const query = {
      text: `
      SELECT * FROM esa_child 
      WHERE id 
      IN (
        SELECT id_enfant FROM esa_parent_has_child WHERE id_parent = $1
        )
      `,
      values: [idParent],
    };
    const result = await this.client.query(query);
    return result.rows;
  }
};
