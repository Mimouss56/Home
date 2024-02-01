const router = require('express').Router();
const { loggedAs } = require('../../../middlewares/auth.middleware');
const portfolioController = require('../controllers/portfolio.controller');

router.route('/')
  .get(portfolioController.getAll)
  .post(loggedAs, portfolioController.create);

router.route('/:id')
  .get(loggedAs, portfolioController.getOne)
  .put(loggedAs, portfolioController.update)
  .delete(loggedAs, portfolioController.delete);

module.exports = router;
