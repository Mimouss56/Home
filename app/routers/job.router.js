const express = require('express');
const router = express.Router();
const jobController = require('../controllers/job.controller');

router.route('/')
  .get(jobController.getAll)
  .post(jobController.post);

router.route('/:id')
  .get(jobController.get)
  .put(jobController.put)
  .delete(jobController.delete);

module.exports = router;