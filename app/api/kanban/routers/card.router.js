const express = require('express');

const router = express.Router();

const cardController = require('../controllers/card.controller');

router.post('/', cardController.post);
// router.put('/:id', cardController.update);
// router.post('/:id/addtag/', cardController.addTag);
// router.post('/:id/removetag/', cardController.removeTag);
// router.delete('/:id', cardController.delete);

module.exports = router;

// router.post('/:id/addtag/:tag', cardController.addTag),
