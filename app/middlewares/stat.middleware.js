const statController = require('../controllers/stats.controller');

const stats = (req, res, next) => {
  // Information du visiteur
  const visitorInfo = {
    ipAddress: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
    url: req.originalUrl,
    userAgent: req.headers['user-agent'],
    pays: req.headers['cf-ipcountry'],
    ville: req.headers['cf-ipcity'],
  };

  // Information de la page visitée
  const pageVisited = {
    url: req.originalUrl,
    title: res.locals.pageTitle,
  };
  // Enregistrer la visite dans la base de données
  const result = statController.post(visitorInfo, pageVisited);
  if (result.code) return res.status(result.code).json(result);
  // Passer au prochain middleware
  return next();
};

module.exports = stats;
