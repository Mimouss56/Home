const express = require('express');
const router = express.Router();
const schoolController = require('../controllers/school.controller');

router.route('/')
  .get(schoolController.getAll)
  .post(schoolController.post);

router.route('/:id')
  .get(schoolController.get)
  .put(schoolController.put)
  .delete(schoolController.delete);

module.exports = router;