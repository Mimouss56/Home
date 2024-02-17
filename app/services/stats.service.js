const logger = require('../utils/logger');
const { visitor, page, stats } = require('../models/index.mapper');

module.exports = {
  create: async (inputVisitor, inputPage) => {
    try {
      const { method, ...rest } = inputVisitor;
      // Enregistrer la visite dans la base de données
      const visitorInfo = await visitor.findOrCreate(rest);
      const pageVisited = await page.findOrCreate(inputPage);

      // Enregistrer la relation entre le visiteur et la page visitée
      const inputQueryView = {
        id_visitor: visitorInfo.id,
        id_page: pageVisited.id,
        duration: 0,
        actions_effectuees: method,
      };
      await stats.createStat(inputQueryView);

      return { message: 'Statistiques enregistrées' };
    } catch (error) {
      logger.error(error);
      return { code: 500, message: 'Erreur lors de l\'enregistrement des statistiques' };
    }
  },
};
