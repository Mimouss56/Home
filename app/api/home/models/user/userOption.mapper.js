const CoreDatamapper = require('../../../../models/core.mapper');

module.exports = class User extends CoreDatamapper {
  tableName = 'user_option';

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
