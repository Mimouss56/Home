const express = require('express');
const router = express.Router();

const apiRouter = require('./api.router');
const loginController = require('../controllers/login.controller');

router.use('/api', apiRouter);
// router login
router.post('/login', loginController.login);
router.post('/register', loginController.register);


module.exports = router