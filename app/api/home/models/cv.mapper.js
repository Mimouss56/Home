const CoreDatamapper = require('../../../models/core.mapper');

module.exports = class CV extends CoreDatamapper {
  tableName = 'cv';

  entTable = 'ent';

  userRelated = 'user_job';

  skillRelated = 'cv_has_skill';

  async findAllByUserId(id) {
    const preparedQuery = {
      text: `
        SELECT * FROM "${this.tableName}" 
        INNER JOIN "${this.userRelated}" ON "${this.tableName}".id = "${this.userRelated}".id_job
        INNER JOIN "${this.entTable}" ON "${this.entTable}".id = "${this.tableName}".id_ent
        WHERE "${this.userRelated}".id_user = $1`,
      values: [id],
    };
    const result = await this.client.query(preparedQuery);
    return result.rows;
  }
};
