const path = require('path');
const express = require('express');
const testController = require('../api/BBC/controllers/test.controller');

const router = express.Router();

router.use('/api', require('./api.router'));
router.use('/status', require('./status.router'));
router.use('/feedback', require('./feedback.router'));

router.get('/test', testController.renderTest);
const publicPath = path.resolve(__dirname, '../app/public');

router.get('/*', (req, res, next) => {
  // Modification ici pour prendre en compte les sous-dossiers
  if (req.originalUrl.startsWith('/images')) {
    next();
  } else {
    // Modification ici pour servir index.html uniquement si le fichier n'est pas trouvé
    res.sendFile(path.join(publicPath, 'index.html'));
  }
});

module.exports = router;
