const express = require('express');

const router = express.Router();
const schoolController = require('../controllers/school.controller');
const { isLogged } = require('../middlewares/validate.middleware');
const { postSchool } = require('../schema/job.schema');
const { loggedAs } = require('../middlewares/auth.middleware');

router.route('/')
  .get(schoolController.getAll);

router.route('/@me')
  .get(loggedAs, schoolController.getAllByUser)
  .post(isLogged(postSchool), schoolController.post);

router.route('/:id')
  .get(schoolController.get)
  .put(schoolController.put)
  .delete(schoolController.delete);

module.exports = router;
