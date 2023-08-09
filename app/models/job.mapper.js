const CoreDatamapper = require('./core.mapper');

module.exports = class Techno extends CoreDatamapper {
  tableName = 'job';
  userJobRelated = 'user_job';
  jobSkillRelated = 'job_skill';


  async findAllByUserId(id) {
    const preparedQuery = {
      text: `
        SELECT * FROM "${this.tableName}" 
        INNER JOIN "${this.userJobRelated}" ON "${this.tableName}".id = "${this.userJobRelated}".id_job 
        WHERE "${this.userJobRelated}".id_user = $1`,
      values: [id],
    };
    const result = await this.client.query(preparedQuery);
    return result.rows;
  }

  async findAllCompetence(id) {
    const preparedQuery = {
      text: `
        SELECT * FROM "${this.tableName}" 
        INNER JOIN "${this.jobSkillRelated}" ON "${this.tableName}".id = "${this.jobSkillRelated}".id_job
        WHERE "${this.jobSkillRelated}".id_skill = $1`,
      values: [id],
    };
    const result = await this.client.query(preparedQuery);
    return result.rows;
  };

  async addJobUser(idUser, idJob) {
    const preparedQuery = {
      text: `
        INSERT INTO "${this.userJobRelated}" (id_user, id_job) 
        VALUES ($1, $2)`,
      values: [idUser, idJob],
    };
    const result = await this.client.query(preparedQuery);
    return result.rows;
  };
  async deleteJobUser(idUser, idJob) {
    const preparedQuery = {
      text: `
        DELETE FROM "${this.userJobRelated}" 
        WHERE id_user = $1 AND id_job = $2`,
      values: [idUser, idJob],
    };
    const result = await this.client.query(preparedQuery);
    return result.rows;
  }
  
};
