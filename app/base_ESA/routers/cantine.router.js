const router = require('express').Router();

const cantineController = require('../controllers/cantine.controller');

router.get('/', cantineController.getAll);
router.put('/:studentId', cantineController.toggleCantinePresence);
module.exports = router;
