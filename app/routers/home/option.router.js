const router = require('express').Router();
const { loggedAs } = require('../../middlewares/auth.middleware');
const optionController = require('../../controllers/home/option.controller');

function checkNameParam(req, res, next) {
  if (req.query.name) {
    return optionController.getOne(req, res, next);
  }
  return next();
}
router.get('/', checkNameParam, loggedAs, optionController.getAll);
// router.get('/', loggedAs, optionController.getAll);
router.post('/', loggedAs, optionController.create);
router.put('/:id', loggedAs, optionController.update);
router.delete('/:id', loggedAs, optionController.delete);

module.exports = router;
