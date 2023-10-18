const { eSACantine, eSAChild } = require('../../models/ESA/index.mapper');

module.exports = {
  async getStudentsByDate(date) {
    console.log(date);
    try {
      // Récupérer tous les enfants
      const allChildren = await eSAChild.findAll();

      // Récupérer les enfants présents à la cantine pour cette date
      const presentChildren = await eSACantine.findAll({ where: { date } });

      // Créer une liste des IDs des enfants présents
      const presentChildrenIds = presentChildren.map((child) => child.id_enfant);

      // Ajouter un champ "present" à chaque enfant pour indiquer s'ils sont présents ou non
      const childrenWithPresence = allChildren.map((child) => ({
        ...child,
        present: presentChildrenIds.includes(child.id),
      }));

      return childrenWithPresence;
    } catch (error) {
      console.error('Erreur lors de la récupération des enfants par date', error);
      throw error;
    }
  },

  async toggleChildPresence(idEnfant, date) {
    const existingRecord = await eSACantine.findOne({
      where: { id_enfant: idEnfant, date },
    });
    console.log('exist', existingRecord);

    try {
      if (existingRecord) {
        await eSACantine.delete(existingRecord.id);
        return false;
      }
      await eSACantine.create({ id_enfant: idEnfant, date });
      return true;
    } catch (error) {
      return {
        code: 500,
        message: error,
      };
    }
  },
};
