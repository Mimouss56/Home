const express = require('express');
const router = express.Router();
const path = require('path');

const apiRouter = require('./api.router');
const loginController = require('../controllers/login.controller');

router.use('/api', apiRouter);
// router login
router.post('/login', loginController.login);
router.post('/register', loginController.register);

const publicPath = path.resolve(__dirname, '../../public');
router.get('/*', (req, res) => {
  res.sendFile('index.html', { root: publicPath });
});

module.exports = router