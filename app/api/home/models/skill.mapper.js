const CoreDatamapper = require('../../../models/core.mapper');

module.exports = class Techno extends CoreDatamapper {
  tableName = 'skill';

  userRelated = 'user_skill';

  skillRelated = 'cv_has_skill';

  async findAllSkillCV(id) {
    const preparedQuery = {
      text: `
        SELECT id, name FROM "${this.tableName}" 
        INNER JOIN "${this.skillRelated}" ON "${this.tableName}".id = "${this.skillRelated}".id_skill 
        WHERE "${this.skillRelated}".id_cv = $1`,
      values: [id],
    };
    const result = await this.client.query(preparedQuery);
    return result.rows;
  }
};
