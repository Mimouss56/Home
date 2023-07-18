const express = require('express');
const router = express.Router();
const path = require('path');

const apiRouter = require('./api.router');
const loginController = require('../controllers/login.controller');

const publicPath = path.resolve(__dirname, '../../public');
router.get('/*', (req, res) => {
  res.sendFile('index.html', { root: publicPath });
});

router.use('/api', apiRouter);
// router login
router.get('/login', loginController.login);
router.post('/register', loginController.register);

// si autre route, on renvoie l'index.html
// on definie le lieu du fichier index.html

// on renvoie le fichier index.html



module.exports = router