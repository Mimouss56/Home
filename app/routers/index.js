const express = require('express');
const testController = require('../api/BBC/controllers/test.controller');

const router = express.Router();

router.use('/feedback', require('./feedback.router'));

router.use('/api', require('./api.router'));

router.get('/test', testController.renderTest);
router.use('/status', require('./status.router'));

router.get('/*', require('../middlewares/redirect.middleware'));

module.exports = router;
