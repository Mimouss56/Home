const CoreDatamapper = require('./core.mapper');

module.exports = class User extends CoreDatamapper {
  tableName = 'user';

  relationTable = 'user_option';

  async count() {
    const query = `SELECT COUNT(*) FROM ${this.tableName}`;
    const result = await this.client.query(query);
    return result.rows[0].count;
  }

  async option(idUser) {
    const query = `SELECT * FROM ${this.relationTable} WHERE id_user = $1`;
    const result = await this.client.query(query, [idUser]);
    return result.rows[0];
  }

  async addOption(idUser, inputData) {
    const query = `INSERT INTO ${this.relationTable} (id_user, id_role) VALUES ($1, $2)`;
    await this.client.query(query, [idUser, inputData.id_role]);
  }

  async updateOption(idUser, inputData) {
    const values = [inputData.id_role, inputData.child, inputData.family, idUser];
    const query = {
      text: `
      UPDATE ${this.relationTable}
      SET id_role = $1, child =$2, family = $3
      WHERE id_user = $4`,
      values,
    };
    await this.client.query(query);
  }
};
