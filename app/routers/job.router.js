const express = require('express');

const router = express.Router();
const jobController = require('../controllers/job.controller');
const { loggedAs } = require('../middlewares/auth.middleware');
const { isLogged, validate, isAdminPost } = require('../middlewares/validate.middleware');
const { postJob } = require('../schema/job.schema');
const { objectID } = require('../schema/sanction.schema');

router.route('/')
  .get(jobController.getAll);

router.route('/@me')
  .get(loggedAs, jobController.getAllByUser)
  .post(isLogged(postJob), jobController.post);
// TODO a revoir
// .delete(isLogged(objectID, 'params'), jobController.deleteJobUser);

router.route('/:id')
  .put(isLogged(postJob), validate(objectID, 'params'), jobController.put)
  .delete(isAdminPost(objectID, 'params'), jobController.delete);

module.exports = router;
