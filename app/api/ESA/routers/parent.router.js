const router = require('express').Router();
const esaParentController = require('../controllers/parent.controller');
const { validate } = require('../../../middlewares/validate.middleware');
const { postParent } = require('../schemas/parent.schema');

router.get('/', esaParentController.getAll);
router.post('/', validate(postParent), esaParentController.create);

router.get('/:id', esaParentController.getOne);
router.put('/:id', esaParentController.update);
// router.delete('/parent/:id', esaParentController.deleteParent);

module.exports = router;
