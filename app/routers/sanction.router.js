const express = require('express');
const router = express.Router();
const sanctionController = require('../controllers/sanction.controller');

router.route('/')
  .get(sanctionController.getAll)
  .post(sanctionController.post);

router.route('/:id')
  .delete(sanctionController.delete)

module.exports = router;