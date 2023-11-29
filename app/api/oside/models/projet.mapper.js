const CoreDatamapper = require('./core.mapper');

module.exports = class Projet extends CoreDatamapper {
  tableName = 'projet';

  relationTable = 'techno_projet';

  // MAJ de la liste des techno_projet
  async add(idProjet, listingTechno) {
    // Supprime la liste actuelle
    await this.remove(idProjet);
    // Ajoute la nouvelle liste
    listingTechno.forEach(async (techno) => {
      const values = [idProjet, techno];
      const preparedQuery = {
        text: `
                INSERT INTO "${this.relationTable}"
                (projet_id, techno_id)
                VALUES ($1,$2)
                RETURNING *
              `,
        values,
      };
      await this.client.query(preparedQuery);
    });
  }

  async remove(idProjet) {
    const preparedQuery = {
      text: `
                DELETE FROM "${this.relationTable}" WHERE projet_id = $1 
                RETURNING *
              `,
      values: [idProjet],
    };
    await this.client.query(preparedQuery);
  }

  async viewTechnosProjet(idProjet) {
    /**
     *  SELECT t.id, t.label, t.color, tp.projet_id projet_id
     *  FROM public.techno_projet tp
     *  JOIN public.techno t ON t.id = tp.techno_id
     *  JOIN public.projet p ON p.id = tp.projet_id;
     */
    const preparedQuery = {
      text: 'SELECT * FROM "show_all_techno_projet" WHERE projet_id = $1',
      values: [idProjet],
    };

    const result = await this.client.query(preparedQuery);
    if (!result.rows) {
      return null;
    }

    return result.rows;
  }

  async viewMembersProjet(idProjet) {
    /**
     *  SELECT mp.projet_id projet_id, mp.user_id user_id
     *  FROM public.member_projet mp
     *  JOIN public.techno t ON t.id = mp.techno_id
     *  JOIN public.user u ON u.id = mp.user_id;
     */
    const preparedQuery = {
      text: `
        SELECT * 
        FROM public.member_projet mp
        JOIN public.projet p ON p.id = mp.projet_id
        JOIN public.user u ON u.id = mp.user_id
        WHERE projet_id = $1`,
      values: [idProjet],
    };

    const result = await this.client.query(preparedQuery);
    if (!result.rows) {
      return null;
    }

    return result.rows;
  }
};
