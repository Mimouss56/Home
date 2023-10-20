const router = require('express').Router();
const { loggedAs } = require('../../middlewares/auth.middleware');
const roleController = require('../controllers/role.controller');

router.get('/', loggedAs, roleController.getAll);

module.exports = router;
