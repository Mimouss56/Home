const CoreDatamapper = require('./core.mapper');

module.exports = class User extends CoreDatamapper {
  tableName = 'schooling';
  userRelated = 'user_schooling';
  skillRelated = 'school_skill';

  async findAllByUserId(id) {
    const preparedQuery = {
      text: `
        SELECT * FROM "${this.tableName}" 
        INNER JOIN "${this.userRelated}" ON "${this.tableName}".id = "${this.userRelated}".id_schooling
        WHERE "${this.userRelated}".id_user = $1`,
      values: [id],
    };
    const result = await this.client.query(preparedQuery);
    return result.rows;
  }


};
