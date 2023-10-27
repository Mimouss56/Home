const router = require('express').Router();
const sanctionController = require('../controllers/sanction.controller');

router.get('/', sanctionController.getAll);

module.exports = router;
