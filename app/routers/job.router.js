const express = require('express');
const router = express.Router();
const jobController = require('../controllers/job.controller');
const { loggedAs } = require('../middlewares/auth.middleware');
const { isLogged } = require('../middlewares/validate.middleware');
const {postJob} = require('../schema/job.schema');

router.route('/')
  .get(jobController.getAll);

router.route('/@me')
  .get(loggedAs, jobController.getAllByUser)
  .post(isLogged(postJob), jobController.post);

router.route('/:id')
  .get(jobController.get)
  .put(jobController.put)
  .delete(jobController.delete);

module.exports = router;