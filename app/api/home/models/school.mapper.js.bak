const CoreDatamapper = require('../../../models/core.mapper');

module.exports = class School extends CoreDatamapper {
  tableName = 'schooling';

  entTable = 'ent';

  userRelated = 'user_schooling';

  skillRelated = 'school_skill';

  async findAllByUserId(id) {
    const preparedQuery = {
      text: `
        SELECT * FROM "${this.tableName}" 
        INNER JOIN "${this.userRelated}" ON "${this.tableName}".id = "${this.userRelated}".id_schooling
        INNER JOIN "${this.entTable}" ON "${this.entTable}".id = "${this.tableName}".id_ent
        WHERE "${this.userRelated}".id_user = $1`,
      values: [id],
    };
    const result = await this.client.query(preparedQuery);
    return result.rows;
  }

  async addSchoolUser(idSchool, idUser) {
    const preparedQuery = {
      text: `
        INSERT INTO "${this.userRelated}" (id_user, id_schooling) 
        VALUES ($1, $2)`,
      values: [idUser, idSchool],
    };
    const result = await this.client.query(preparedQuery);
    return result.rows;
  }
};
