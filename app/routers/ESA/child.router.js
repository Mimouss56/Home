const router = require('express').Router();
const { validate } = require('../../middlewares/validate.middleware');
const childController = require('../../controllers/ESA/child.controller');
const { postChild } = require('../../schema/ESA/child.schema');

router.get('/', childController.getAllChild);
router.post('/', validate(postChild), childController.create);

router.get('/:id', childController.getOne);
router.put('/:id', childController.update);
router.delete('/:id', childController.delete);

module.exports = router;
