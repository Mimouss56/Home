const express = require('express');
const testController = require('../base_BBC/controllers/test.controller');

const router = express.Router();

router.use('/api', require('./api.router'));

router.get('/test', testController.renderTest);

// const publicPath = path.resolve(__dirname, '../../public');
router.get('/*', (req, res) => {
  res.json('Welcome to the Mouss\'s API');
});

module.exports = router;
