const CoreDatamapper = require('./core.mapper');

module.exports = class User extends CoreDatamapper {
  tableName = 'user';

  relationTable = 'member_techno';

  async viewTechnoUser(id) {
    const technoUser = await this.client.query({
      text: `SELECT * FROM ${this.relationTable} 
      JOIN techno ON ${this.relationTable}.techno_id = techno.id
      WHERE ${this.relationTable}.user_id = $1`,
      values: [id],
    });
    return technoUser.rows;
  }

  // MAJ de la liste des member_techno
  async addTechno(idUser, listingTechno) {
    // Supprime la liste actuelle
    await this.removetechno(idUser);
    // Ajoute la nouvelle liste
    listingTechno.forEach(async (techno) => {
      const values = [idUser, techno];
      const preparedQuery = {
        text: `
                INSERT INTO "${this.relationTable}"
                (user_id, techno_id)
                VALUES ($1,$2)
                RETURNING *
              `,
        values,
      };
      await this.client.query(preparedQuery);
    });
  }

  async removetechno(idUser) {
    const preparedQuery = {
      text: `
                DELETE FROM "${this.relationTable}" WHERE user_id = $1 
                RETURNING *
              `,
      values: [idUser],
    };
    await this.client.query(preparedQuery);
  }
};
