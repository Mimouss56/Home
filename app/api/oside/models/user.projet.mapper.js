const CoreDatamapper = require('./core.mapper');

module.exports = class MemberProjet extends CoreDatamapper {
  tableName = 'member_projet';

  async removeProjet(idProjet) {
    const preparedQuery = {
      text: `
                DELETE FROM "${this.tableName}" WHERE projet_id = $1 
                RETURNING *
              `,
      values: [idProjet],
    };
    await this.client.query(preparedQuery);
  }

  async removeUser(idProjet) {
    const preparedQuery = {
      text: `
                DELETE FROM "${this.tableName}" WHERE user_id = $1 
                RETURNING *
              `,
      values: [idProjet],
    };
    await this.client.query(preparedQuery);
  }

  async participate(idProjet, idUser) {
    const values = [idProjet, idUser];
    const preparedQuery = {
      text: `
        INSERT INTO "${this.tableName}"
        (projet_id, user_id)
        VALUES ($1,$2)
        RETURNING *
      `,
      values,
    };
    const result = await this.client.query(preparedQuery);
    return result.rowCount;
  }

  async leave(idProjet, idUser) {
    const values = [idProjet, idUser];
    const preparedQuery = {
      text: `
                DELETE FROM "${this.tableName}" WHERE projet_id = $1 AND user_id = $2
                RETURNING *
              `,
      values,
    };
    const result = await this.client.query(preparedQuery);
    return result.rowCount;
  }
};
