const statService = require('../services/stats.service');

module.exports = {
  post: (visitorInfo, pageVisited) => {
    const inputQueryVisitor = {
      ip_address: visitorInfo.ipAddress,
      navigateur_os: visitorInfo.userAgent,
      pays: visitorInfo.pays || 'Pays inconnu',
      ville: visitorInfo.ville || 'Ville inconnue',
      method: visitorInfo.method,
    };
    const inputQueryPage = {
      url: pageVisited.url,
      titre: pageVisited.title || 'Page sans titre',
      description: pageVisited.description || 'Page sans description',
    };

    // Enregistrer la visite dans la base de données
    const result = statService.create(inputQueryVisitor, inputQueryPage);
    return result;
  },
};
