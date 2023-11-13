const express = require('express');

const router = express.Router();

const listController = require('../controllers/list.controller');

router.get('/', listController.getAll);
router.post('/', listController.create);
router.get('/:id', listController.get);
router.put('/:id', listController.update);
router.delete('/:id', listController.delete);
// router.get('/:id/cards', listController.getCardsInList);

module.exports = router;
