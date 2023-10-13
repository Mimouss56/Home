const express = require('express');
const { loggedAs, loggedESA } = require('../middlewares/auth.middleware');
const loginController = require('../controllers/auth.controller');

const router = express.Router();
// router login
router.post('/login', loginController.login);
router.post('/register', loginController.register);

router.use('/job', require('./home/job.router'));
router.use('/news', require('./home/news.router'));
router.use('/sanction', loggedAs, require('./home/sanction.router'));
router.use('/skill', require('./home/skill.router'));
router.use('/user', require('./home/user.router'));

// A faire dans Swagger
router.use('/cv', loggedAs, require('./home/cv.router'));
router.use('/esa', loggedESA, require('./ESA'));
router.use('/option', require('./home/option.router'));
router.use('/school', require('./home/school.router'));
router.use('/test', require('./home/test.router'));

module.exports = router;
