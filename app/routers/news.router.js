const router = require('express').Router();
const { isAdminPost } = require('../middlewares/validate.middleware');
const { loggedAs } = require('../middlewares/auth.middleware');
const { news } = require('../schema/news.schema');

const newsController = require('../controllers/news.controller');

router.get('/', newsController.getAll);
router.get('/:id', newsController.get);
router.post('/', loggedAs, isAdminPost(news), newsController.post);
// router.put('/:id', newsController.update);
// router.delete('/:id', newsController.delete);

module.exports = router;