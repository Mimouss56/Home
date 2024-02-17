const express = require('express');
const path = require('path');
const testController = require('../api/BBC/controllers/test.controller');

const router = express.Router();

router.use('/feedback', require('./feedback.router'));

router.use('/api', require('./api.router'));

router.get('/test', testController.renderTest);
router.use('/status', require('./status.router'));

router.get('/*', require('../middlewares/stat.middleware'), (req, res) => {
  res.sendFile(path.join(__dirname, '../../public', 'index.html'));
});

module.exports = router;
