const express = require('express');

const router = express.Router();
const sanctionController = require('../../controllers/home/sanction.controller');
const { isAdminPost, validate } = require('../../middlewares/validate.middleware');
const { loggedAs } = require('../../middlewares/auth.middleware');
const { sanction, objectID } = require('../../schema/sanction.schema');

router.route('/')
  .get(sanctionController.getAll)
  .post(isAdminPost(sanction), sanctionController.post);

router.route('/@me')
  .get(loggedAs, sanctionController.getMe);

router.route('/:id')
  .get(validate(objectID, 'params'), sanctionController.get)
  .put(validate(objectID, 'params'), isAdminPost(sanction), sanctionController.put)
  .delete(isAdminPost(objectID, 'params'), sanctionController.delete);

module.exports = router;