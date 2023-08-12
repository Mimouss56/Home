const express = require('express');
const { loggedAs } = require('../middlewares/auth.middleware');
const loginController = require('../controllers/login.controller');
const router = express.Router();
// router login
router.post('/login', loginController.login);
router.post('/register', loginController.register);
router.use('/sanction', loggedAs, require('./sanction.router'));
router.use('/job', require('./job.router'));
router.use('/user', loggedAs, require('./user.router'));

// A faire dans Swagger
router.use('/cv', loggedAs, require('./cv.router'));
router.use('/school', require('./school.router'));


module.exports = router;