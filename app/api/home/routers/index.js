const router = require('express').Router();
const { loggedAs } = require('../../../middlewares/auth.middleware');
const { validate } = require('../../../middlewares/validate.middleware');
const loginController = require('../controllers/auth.controller');
const { loginSchema } = require('../schemas/auth.schema');

/**
 * POST /api/home/login
 * @summary Login to the application
 * @tags Auth
 * @param {Login} request.body.required - Login object
 * @return {Logged} 200 - token
 * @return 400 - Invalid username/password supplied
 * @return 401 - Unauthorized
 * @return 500 - Unexpected error
 */
router.post('/login', validate(loginSchema), loginController.login);

/**
 * POST /api/home/register
 * @summary Register to the application
 * @tags Auth
 * @param {Register} request.body.required - Register object
 * @return 200 - Utilisateur créé
 * @return 400 - Invalid username/password supplied
 * @return 500 - Unexpected error
 * @return 409 - User already exists
 * @return 401 - Unauthorized
*/
router.post('/register', loginController.register);
router.use('/cv', require('./cv.router'));

router.use('/news', require('./news.router'));
router.use('/option', require('./option.router'));
router.use('/portfolio', require('./portfolio.router'));
router.use('/role', require('./role.router'));
router.use('/sanction', loggedAs, require('./sanction.router'));
router.use('/skill', require('./skill.router'));
router.use('/suivi', loggedAs, require('./SuiviEnt/index.router'));
router.use('/ent', require('./ent.router'));
router.use('/feedback', require('./feedback.router'));

// A faire dans Swagger

router.use('/upload', require('./upload.router'));
router.use('/user', require('./user.router'));

module.exports = router;
