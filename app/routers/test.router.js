const router = require('express').Router();
const testController = require('../api/BBC/controllers/test.controller');

router.get('/', testController.renderTest);

module.exports = router;
