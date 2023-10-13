const router = require('express').Router();
const esaController = require('../../controllers/ESA/parent.controller');

router.get('/parent', esaController.getAllParent);
router.post('/parent', esaController.createParent);

router.get('/parent/:id', esaController.getOneParent);
router.put('/parent/:id', esaController.updateParent);
router.delete('/parent/:id', esaController.deleteParent);

module.exports = router;
