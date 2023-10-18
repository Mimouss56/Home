const router = require('express').Router();
const { validate } = require('../../middlewares/validate.middleware');
const esaController = require('../../controllers/ESA/child.controller');
const { postChild } = require('../../schema/ESA/child.schema');

router.get('/', esaController.getAllChild);
router.post('/', validate(postChild), esaController.create);

router.get('/:id', esaController.getOne);
router.put('/:id', esaController.update);
router.delete('/:id', esaController.delete);

module.exports = router;
