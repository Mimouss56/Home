const CoreDatamapper = require('../../../../models/core.mapper');

module.exports = class CV extends CoreDatamapper {
  tableName = 'cv';

  entTable = 'ent';

  userRelated = 'user_job';

  skillRelated = 'cv_has_skill';

  async findAllByUserId(id) {
    const preparedQuery = {
      text: `
      SELECT cv.*, ent.name, ent.address, ent.town, ent.postal_code, ent.url_img
      FROM "${this.tableName}"
      INNER JOIN "${this.userRelated}" ON "${this.tableName}".id = "${this.userRelated}".id_job
      INNER JOIN "${this.entTable}" ON "${this.entTable}".id = "${this.tableName}".id_ent
      WHERE "${this.userRelated}".id_user = $1`,
      values: [id],
    };

    const result = await this.client.query(preparedQuery);
    return result.rows;
  }

  /**
   *
   * @param {number} idJob - id of CV
   * @param {number} idUser - id of user
   * @returns
   */
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

  /**
   * @param {number} id - id of CV
   * @param {array} data - array of idSkill
   */
  async SkillCV(id, data) {
    // on suppresse les anciennes compétences
    const deleteQuery = {
      text: `DELETE FROM "${this.skillRelated}" WHERE id_cv = $1`,
      values: [id],
    };
    await this.client.query(deleteQuery);
    // on ajoute les nouvelles compétences une par une
    // Créer un tableau de promesses pour les requêtes d'insertion
    const insertionPromises = data.map(async (skillId) => {
      const insertQuery = {
        text: `INSERT INTO "${this.skillRelated}" (id_cv, id_skill) VALUES ($1, $2)`,
        values: [id, skillId],
      };
      return this.client.query(insertQuery);
    });

    // Attendre que toutes les requêtes d'insertion soient terminées
    await Promise.all(insertionPromises);
  }
};
