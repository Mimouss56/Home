const router = require('express').Router();
const esaController = require('../../controllers/ESA/child.controller');

router.get('/', esaController.getAllChild);
router.post('/', esaController.create);

router.get('/:id', esaController.getOne);
router.put('/:id', esaController.update);
router.delete('/:id', esaController.delete);

module.exports = router;
