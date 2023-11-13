const express = require('express');

const router = express.Router();

const listController = require('../controllers/list.controller');

router.get('/', listController.getAll);
// router.get('/:id', listController.get);
// router.get('/:id/cards', listController.getCardsInList);
router.post('/', listController.create);
router.put('/:id', listController.update);
router.delete('/:id', listController.delete);

module.exports = router;
