const statController = require('../controllers/stats.controller');

const stats = (req, res, next) => {
  if (!req.session.views) {
    req.session.views = {};
  }

  const sessionId = req.session.id;
  // on ignore les url qui contiennent /images et /assets
  if (['/images', '/assets'].some((route) => req.originalUrl.startsWith(route))) return next();
  // Information du visiteur
  const visitorInfo = {
    ipAddress: req.ip,
    url: req.originalUrl,
    userAgent: req.headers['user-agent'],
    pays: req.headers['cf-ipcountry'],
    ville: req.headers['cf-ipcity'],
    method: req.method,
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
