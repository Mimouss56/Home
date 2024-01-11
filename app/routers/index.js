const path = require('path');
const express = require('express');
const testController = require('../api/BBC/controllers/test.controller');

const router = express.Router();

router.use('/api', require('./api.router'));
router.use('/status', require('./status.router'));

router.get('/test', testController.renderTest);
const publicPath = path.resolve(__dirname, '../../public');
router.get('/*', (req, res, next) => {
  if (req.originalUrl.startsWith('/images/')) {
    // Si l'URL commence par /images/, passez au middleware suivant sans servir index.html
    next();
  }
  // Sinon, servez index.html
  res.sendFile(path.join(publicPath, 'index.html'));
});

module.exports = router;
