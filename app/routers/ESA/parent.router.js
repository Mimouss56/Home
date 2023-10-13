const router = require('express').Router();
const esaParentController = require('../../controllers/ESA/parent.controller');
const { validate } = require('../../middlewares/validate.middleware');
const { postParent } = require('../../schema/ESA/parent.schema');

// router.get('/parent', esaController.getAllParent);
router.post('/', validate(postParent), esaParentController.create);

router.get('/:id', esaParentController.getOne);
// router.put('/parent/:id', esaParentController.updateParent);
// router.delete('/parent/:id', esaParentController.deleteParent);

module.exports = router;
