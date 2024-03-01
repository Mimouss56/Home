const CoreDatamapper = require('../../../models/core.mapper');

module.exports = class Techno extends CoreDatamapper {
  tableName = 'skill';

  userRelated = 'user_skill';

  skillRelated = 'cv_has_skill';

  async findAllSkillJob(id) {
    const preparedQuery = {
      text: `
        SELECT name FROM "${this.tableName}" 
        INNER JOIN "${this.skillRelated}" ON "${this.tableName}".id = "${this.skillRelated}".id_skill 
        WHERE "${this.skillRelated}".id_cv = $1`,
      values: [id],
    };
    const result = await this.client.query(preparedQuery);
    return result.rows;
  }

  // async findAllSkillSchool(id) {
  //   const preparedQuery = {
  //     text: `
  //       SELECT name FROM "${this.tableName}"
  //       INNER JOIN "${this.schoolRelated}"
  //       ON "${this.tableName}".id = "${this.schoolRelated}".id_skill
  //       WHERE "${this.schoolRelated}".id_schooling = $1`,
  //     values: [id],
  //   };
  //   const result = await this.client.query(preparedQuery);
  //   return result.rows;
  // }
};
