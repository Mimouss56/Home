const router = require('express').Router();
const { loggedAs } = require('../../../middlewares/auth.middleware');
const loginController = require('../controllers/auth.controller');

router.post('/login', loginController.login);
router.post('/register', loginController.register);

router.use('/job', require('./job.router'));
router.use('/news', require('./news.router'));
router.use('/role', require('./role.router'));
router.use('/portfolio', require('./portfolio.router'));
router.use('/upload', require('./upload.router'));

router.use('/sanction', loggedAs, require('./sanction.router'));
router.use('/skill', require('./skill.router'));
router.use('/user', require('./user.router'));

// A faire dans Swagger
router.use('/cv', loggedAs, require('./cv.router'));
router.use('/option', require('./option.router'));
router.use('/school', require('./school.router'));
router.use('/test', require('../../../routers/test.router'));

module.exports = router;
