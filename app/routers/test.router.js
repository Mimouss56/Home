const router = require('express').Router();
const testController = require('../base_BBC/controllers/test.controller');

router.get('/', testController.renderTest);

module.exports = router;
