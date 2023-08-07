const express = require('express');
const router = express.Router();
<<<<<<< HEAD
=======
const path = require('path');
>>>>>>> 07764e19d3de1573d3072b5886d889345b9347fe

const apiRouter = require('./api.router');
const loginController = require('../controllers/login.controller');

<<<<<<< HEAD
router.use('/api', apiRouter);
// router login
router.post('/login', loginController.login);
router.post('/register', loginController.register);

=======
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


>>>>>>> 07764e19d3de1573d3072b5886d889345b9347fe

module.exports = router