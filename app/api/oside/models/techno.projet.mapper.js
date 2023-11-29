const CoreDatamapper = require('./core.mapper');

module.exports = class TechnoProjet extends CoreDatamapper {
  tableName = 'techno_projet';

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

  async removeTechno(idProjet) {
    const preparedQuery = {
      text: `
                DELETE FROM "${this.tableName}" WHERE techno_id = $1 
                RETURNING *
              `,
      values: [idProjet],
    };
    await this.client.query(preparedQuery);
  }
};
