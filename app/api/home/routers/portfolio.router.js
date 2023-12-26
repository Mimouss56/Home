const router = require('express').Router();
const { loggedAs } = require('../../../middlewares/auth.middleware');
const portfolioController = require('../controllers/portfolio.controller');

router.get('/', portfolioController.getAll);
router.get('/:id', loggedAs, portfolioController.getOne);
router.post('/', loggedAs, portfolioController.create);
router.put('/:id', loggedAs, portfolioController.update);
router.delete('/:id', loggedAs, portfolioController.delete);

module.exports = router;
