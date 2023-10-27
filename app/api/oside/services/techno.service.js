const { techno, technoProjet, memberTechno } = require('../models/index.mapper');

module.exports = {

  async getAll() {
    const technos = await techno.findAll();
    if (!technos) {
      return {
        code: 404,
        message: 'Technos not found',
      };
    }
    const returnTechnos = technos.map((technoInfo) => {
      const oneTechno = {
        id: technoInfo.id,
        label: technoInfo.label,
        color: technoInfo.color,
      };
      return oneTechno;
    });
    return returnTechnos;
  },

  async getData(id) {
    const technoByID = await techno.findByPk(id);
    if (!technoByID) {
      return {
        code: 404,
        message: 'Techno not found',
      };
    }

    const returnTechnos = {
      id: technoByID.id,
      label: technoByID.label,
      color: technoByID.color,
    };

    return returnTechnos;
  },

  async create(inputQuery) {
    if (!inputQuery.label) {
      return {
        code: 400,
        message: 'Label is missing',
      };
    }
    try {
      const technoCreated = await techno.create(inputQuery);

      return technoCreated;
    } catch (error) {
      return {
        code: 500,
        message: 'Techno not created',
      };
    }
  },

  async update(id, inputQuery) {
    const technoExist = await techno.findByPk(id);
    if (!technoExist) {
      return {
        code: 404,
        message: 'Techno not found',
      };
    }
    try {
      const technoUpdated = await techno.update(id, inputQuery);
      return technoUpdated;
    } catch (error) {
      return {
        code: 500,
        message: 'Techno not updated',
      };
    }
  },
  async delete(id) {
    const technoExist = await this.getData(id);

    try {
      // Supprime les technos des projets associés
      await technoProjet.removeTechno(technoExist.id);
      // supprime les technos des users associés
      await memberTechno.removeTechno(technoExist.id);
      // Supprime la techno
      const technoDeleted = await techno.delete(technoExist.id);
      return technoDeleted;
    } catch (error) {
      return {
        code: 500,
        message: `Techno not deleted ${error}`,
      };
    }
  },
  async checkTechno(label) {
    const technoExist = await techno.findOne({ where: { label } });
    return technoExist;
  },
};
