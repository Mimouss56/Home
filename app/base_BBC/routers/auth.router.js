const express = require('express');

const router = express.Router();

const loginController = require('../controllers/login.controller');

router.get('/login', loginController.login);
router.get('/logout', loginController.logout);

module.exports = router;
