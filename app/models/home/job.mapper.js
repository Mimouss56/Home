const CoreDatamapper = require('../core.mapper');

module.exports = class Job extends CoreDatamapper {
  tableName = 'job';

  userRelated = 'user_job';

  skillRelated = 'job_skill';

  async findAllByUserId(id) {
    const preparedQuery = {
      text: `
        SELECT * FROM "${this.tableName}" 
        INNER JOIN "${this.userRelated}" ON "${this.tableName}".id = "${this.userRelated}".id_job 
        WHERE "${this.userRelated}".id_user = $1`,
      values: [id],
    };
    const result = await this.client.query(preparedQuery);
    return result.rows;
  }

  async findAllJobSkill(id) {
    const preparedQuery = {
      text: `
        SELECT * FROM "${this.tableName}" 
        INNER JOIN "${this.skillRelated}" ON "${this.tableName}".id = "${this.skillRelated}".id_job
        WHERE "${this.skillRelated}".id_skill = $1`,
      values: [id],
    };
    const result = await this.client.query(preparedQuery);
    return result.rows;
  }

  async addJobUser(idJob, idUser) {
    const preparedQuery = {
      text: `
        INSERT INTO "${this.userRelated}" (id_user, id_job) 
        VALUES ($1, $2)`,
      values: [idUser, idJob],
    };
    const result = await this.client.query(preparedQuery);
    return result.rows;
  }

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
