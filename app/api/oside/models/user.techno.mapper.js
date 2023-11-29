const CoreDatamapper = require('./core.mapper');

module.exports = class MemberTechno extends CoreDatamapper {
  tableName = 'member_techno';

  async removeUser(idUser) {
    const preparedQuery = {
      text: `
                  DELETE FROM "${this.tableName}" WHERE user_id = $1
                  RETURNING *
                `,
      values: [idUser],
    };
    await this.client.query(preparedQuery);
  }

  async removeTechno(idTechno) {
    const preparedQuery = {
      text: `
                DELETE FROM "${this.tableName}" WHERE techno_id = $1
                RETURNING *
              `,
      values: [idTechno],
    };
    await this.client.query(preparedQuery);
  }
};
