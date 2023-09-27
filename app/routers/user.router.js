const express = require('express');

const router = express.Router();
const userController = require('../controllers/user.controller');
const { loggedAs } = require('../middlewares/auth.middleware');

router.get('/', loggedAs, userController.getAll);

router.get('/:id', userController.get);

module.exports = router;
