const CoreDatamapper = require('./core.mapper');

module.exports = class Techno extends CoreDatamapper {
  tableName = 'skill';
  userRelated = 'user_skill';
  jobRelated = 'job_skill';
  schoolRelated = 'school_skill';

  async findAllSkillJob(id) {
    const preparedQuery = {
      text: `
        SELECT name FROM "${this.tableName}" 
        INNER JOIN "${this.jobRelated}" ON "${this.tableName}".id = "${this.jobRelated}".id_skill 
        WHERE "${this.jobRelated}".id_job = $1`,
      values: [id],
    };
    const result = await this.client.query(preparedQuery);
    return result.rows;
  }
  async findAllSkillSchool(id) {
    const preparedQuery = {
      text: `
        SELECT name FROM "${this.tableName}" 
        INNER JOIN "${this.schoolRelated}" ON "${this.tableName}".id = "${this.schoolRelated}".id_skill 
        WHERE "${this.schoolRelated}".id_schooling = $1`,
      values: [id],
    };
    const result = await this.client.query(preparedQuery);
    return result.rows;
  }
};
