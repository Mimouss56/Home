const express = require('express');

const router = express.Router();

const tagController = require('../controllers/tagController');

router.get('/', tagController.getAll);
router.get('/:id', tagController.getById);
router.post('/', tagController.post);
router.put('/:id', tagController.update);
router.delete('/:id', tagController.delete);


module.exports = router;
