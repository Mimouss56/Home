const router = require('express').Router();
const { isAdminPost, isLogged } = require('../middlewares/validate.middleware');
const { loggedAs } = require('../middlewares/auth.middleware');
const { news, newsPut } = require('../schema/news.schema');

const newsController = require('../controllers/news.controller');

router.get('/', newsController.getAll);
router.post('/', loggedAs, isAdminPost(news), newsController.post);

router.get('/:id', newsController.get);
router.delete('/:id', loggedAs, newsController.delete);
router.put('/:id', isLogged(newsPut), newsController.update);

module.exports = router;
