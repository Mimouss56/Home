const router = require('express').Router();
const testController = require('../../controllers/BBC/test.controller');

router.get('/', testController.renderTest);

module.exports = router;
